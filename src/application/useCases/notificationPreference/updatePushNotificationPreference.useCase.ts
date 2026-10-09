import { AppError, BadRequestError } from "../../../shared/error/appError";
import { log } from "../../../shared/logger/logger";
import { NotificationPreference } from "../../../domain/entities/notificationPreference.entity";
import { INotificationPreferenceRepository } from "../../../domain/interfaces/repositories/INotificationPreference.repository";
import {
  UpdatePushNotificationPreferenceInput,
  UpdatePushNotificationPreferenceOutput,
} from "../../dtos/notificationPreference.tdto";

export class UpdatePushNotificationPreferenceUseCase {
  constructor(
    private readonly notificationPreferenceRepository: INotificationPreferenceRepository,
  ) {}

  async execute(
    input: UpdatePushNotificationPreferenceInput,
  ): Promise<UpdatePushNotificationPreferenceOutput> {
    try {
      const { userId, pushNotification } = input;
      if (!userId) {
        throw new BadRequestError();
      }

      const notificationPreference =
        (await this.notificationPreferenceRepository.findByUserId(userId)) ??
        (await this.notificationPreferenceRepository.create(
          NotificationPreference.create({ userId }),
        ));

      const accountActivity = notificationPreference.accountActivity;
      accountActivity.push = pushNotification;
      notificationPreference.updateAccountActivity(accountActivity);

      const systemUpdates = notificationPreference.systemUpdates;
      systemUpdates.push = pushNotification;
      notificationPreference.updateSystemUpdates(systemUpdates);

      const promotionalUpdates = notificationPreference.promotionalUpdates;
      promotionalUpdates.push = pushNotification;
      notificationPreference.updatePromotionalUpdates(promotionalUpdates);

      const updatedPreference =
        await this.notificationPreferenceRepository.update(notificationPreference);
      if (!updatedPreference) {
        throw new AppError();
      }

      return { pushNotification };
    } catch (error) {
      log.error("UpdatePushNotificationPreferenceUseCase failed :", { error });
      throw error;
    }
  }
}
