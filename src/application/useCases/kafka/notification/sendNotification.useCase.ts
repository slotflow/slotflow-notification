import { log } from "../../../../shared/logger/logger";
import { AppError } from "../../../../shared/error/appError";
import { NotificationEventPayload } from "../../../dtos/notification.dto";
import { Notification } from "../../../../domain/entities/notification.entity";
import { serializeRecordValues } from "../../../../shared/utils/helpers/serializeRecordValues";
import { IPushNotificationService } from "../../../interfaces/services/IPushNotification.service";
import { notificationTemplateRegistry } from "../../../../shared/utils/constants/notificationConstants";
import { IUserDeviceRepository } from "../../../../domain/interfaces/repositories/IUserDevice.repository";
import { INotificationRepository } from "../../../../domain/interfaces/repositories/INotification.repository";

export class SendNotificationUseCase {

    constructor(
        private readonly notificationRepository: INotificationRepository,
        private readonly pushNotificationService: IPushNotificationService,
        private readonly userDeviceRepository: IUserDeviceRepository
    ) { };

    async execute(input: NotificationEventPayload): Promise<void> {
        try {
            const { templateKey, userId, ...payloadData } = input;

            const template = notificationTemplateRegistry[templateKey] as typeof notificationTemplateRegistry[typeof templateKey];

            if (!template) {
                throw new AppError(`Notification template not found for key: ${templateKey}`, 400);
            }

            const title = template.title(payloadData as never);
            const body = template.body(payloadData as never);

            const serializedData = serializeRecordValues(payloadData);

            const inAppNotification = Notification.create({
                userId,
                title,
                body,
                data: serializedData,
            });

            await this.notificationRepository.create(inAppNotification);

            const userDevices = await this.userDeviceRepository.findByUserId(userId);

            if (userDevices && userDevices.length > 0) {
                const tokens = userDevices.map((device) => device.deviceId);

                await this.pushNotificationService.sendNotification({
                    tokens,
                    title,
                    body,
                    data: serializedData,
                });
            }

        } catch (error) {
            log.error("SendNotificationUseCase failed : ", error as Error);
            throw error;
        };
    };
};