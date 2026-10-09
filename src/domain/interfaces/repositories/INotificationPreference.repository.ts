import { NotificationPreference } from "../../entities/notificationPreference.entity";

export interface INotificationPreferenceRepository {
  create(notificationPreference: NotificationPreference): Promise<NotificationPreference>;

  update(notificationPreference: NotificationPreference): Promise<NotificationPreference>;

  findById(id: string): Promise<NotificationPreference | null>;

  findByUserId(userId: string): Promise<NotificationPreference | null>;
}
