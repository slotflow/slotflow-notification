import { log } from "../../../../shared/logger/logger";
import { AppError } from "../../../../shared/error/appError";
import { NotificationEventPayload } from "../../../dtos/notification.dto";
import { Notification } from "../../../../domain/entities/notification.entity";
import { serializeRecordValues } from "../../../../shared/utils/helpers/serializeRecordValues";
import { IPushNotificationService } from "../../../interfaces/services/IPushNotification.service";
import { notificationTemplateRegistry } from "../../../../shared/utils/constants/notificationConstants";
import { IUserDeviceRepository } from "../../../../domain/interfaces/repositories/IUserDevice.repository";
import { INotificationRepository } from "../../../../domain/interfaces/repositories/INotification.repository";

const isNotificationTemplateKey = (
  value: unknown,
): value is keyof typeof notificationTemplateRegistry =>
  typeof value === "string" &&
  Object.prototype.hasOwnProperty.call(notificationTemplateRegistry, value);

export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly pushNotificationService: IPushNotificationService,
    private readonly userDeviceRepository: IUserDeviceRepository,
  ) {}

  async execute(input: NotificationEventPayload): Promise<void> {
    let templateKey: unknown;
    try {
      if (!input || typeof input !== "object") {
        throw new AppError("Invalid notification event: expected an object payload", 400);
      }

      templateKey = input.templateKey;
      if (!isNotificationTemplateKey(templateKey)) {
        throw new AppError(
          `Invalid notification event: missing or unknown templateKey (${String(templateKey)})`,
          400,
        );
      }

      if (typeof input.userId !== "string" || input.userId.trim().length === 0) {
        throw new AppError("Invalid notification event: userId is required", 400);
      }

      const { userId, templateKey: eventTemplateKey, ...payloadData } = input;

      const template = notificationTemplateRegistry[eventTemplateKey];

      if (!template) {
        throw new AppError(`Notification template not found for key: ${eventTemplateKey}`, 400);
      }

      const title = template.title(payloadData as never);
      const body = template.body(payloadData as never);

      const serializedData = serializeRecordValues(payloadData);

      const inAppNotification = Notification.create({
        userId,
        title,
        body,
        data: serializedData,
        type: payloadData.notificationType,
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
      log.error(`SendNotificationUseCase failed [templateKey=${String(templateKey)}]`, { error });
      throw error;
    }
  }
}
