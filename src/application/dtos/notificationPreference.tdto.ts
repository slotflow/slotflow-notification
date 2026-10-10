import { NotificationPreference } from "../../domain/entities/notificationPreference.entity";
import { NotificationPreferenceProps } from "../../domain/contracts/notificationPreference.contract";

/**
 * Usecase dtos
 */

// Get my notification preference
export interface GetMyNotificationPreferenceInput {
  userId: string;
}
export type GetMyNotificationPreferenceOutput = Pick<
  NotificationPreference,
  "accountActivity" | "systemUpdates" | "promotionalUpdates"
>;

// Update notification preference
export type UpdateNotificationPreferenceInput = Pick<NotificationPreferenceProps, "userId"> & {
  pushNotification: boolean;
};

// Update push notification preference for all notification types
export interface UpdatePushNotificationPreferenceInput {
  userId: string;
  pushNotification: boolean;
}
export type UpdatePushNotificationPreferenceOutput = Pick<
  UpdatePushNotificationPreferenceInput,
  "pushNotification"
>;
