import { log } from "../../../shared/logger/logger";
import { AppError, BadRequestError } from "../../../shared/error/appError";
import { UpdateNotificationPreferenceInput } from "../../dtos/notificationPreference.tdto";
import { NotificationPreference } from "../../../domain/entities/notificationPreference.entity";
import { INotificationPreferenceRepository } from "../../../domain/interfaces/repositories/INotificationPreference.repository";

export class UpdateNotificationPreferenceUseCase {
  constructor(
    private readonly notificationPreferenceRepository: INotificationPreferenceRepository,
  ) {}

  async execute(input: UpdateNotificationPreferenceInput): Promise<void> {
    try {
      const { pushNotification, userId } = input;
      if (!userId) {
        throw new BadRequestError();
      }

      const notificationPreference =
        (await this.notificationPreferenceRepository.findByUserId(input.userId)) ??
        (await this.notificationPreferenceRepository.create(
          NotificationPreference.create({ userId: input.userId }),
        ));

      notificationPreference.updateAccountActivity({
        ...notificationPreference.accountActivity,
        push: pushNotification,
      });
      notificationPreference.updateSystemUpdates({
        ...notificationPreference.systemUpdates,
        push: pushNotification,
      });
      notificationPreference.updatePromotionalUpdates({
        ...notificationPreference.promotionalUpdates,
        push: pushNotification,
      });

      const updatedNotificationPreference =
        await this.notificationPreferenceRepository.update(notificationPreference);
      if (!updatedNotificationPreference) {
        throw new AppError();
      }
    } catch (error) {
      log.error("UpdateNotificationPreferenceUseCase failed :", { error });
      throw error;
    }
  }
}
