import { log } from "../../../shared/logger/logger";
import { SendNotificationRequest } from "../../dtos/common.dtos";
import { ISendNotificationUseCase } from "../../dtos/useCase.dtos";
import { Notification } from "../../../domain/entities/notification.entity";
import { IUserDeviceRepository } from "../../../domain/interfaces/repositories/IUserDevice.repository";
import { IPushNotificationService } from "../../../domain/interfaces/services/IPushNotification.service";
import { INotificationRepository } from "../../../domain/interfaces/repositories/INotification.repository";

export class SendNotificationUseCase implements ISendNotificationUseCase{
    constructor(
        private readonly notificationRepository: INotificationRepository,
        private readonly pushNotificationService: IPushNotificationService,
        private readonly userDeviceRepository: IUserDeviceRepository
    ) { };

    async execute(payload: SendNotificationRequest): Promise<void> {
        try {
            const { pushNotification, userId, body, data, title} = payload;

            const inAppNotification = Notification.create({
                userId,
                pushNotification,
                title,
                body,
                data,
            });
            await this.notificationRepository.create(inAppNotification);

            if(pushNotification) {
                
                const userDevices = await this.userDeviceRepository.findByUserId(userId);
                if(!userDevices) return;

                await this.pushNotificationService.sendNotification({
                    tokens: userDevices.map((device) => device.deviceId),
                    title,
                    body,
                    data,
                });
            };

        } catch (error) {
            log.error("SendNotificationUseCase failed : ",error as Error);
            throw error;
        };
    };
};