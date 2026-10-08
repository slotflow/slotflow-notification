import { NotificationPreferenceProps } from "../contracts/notificationPreference.contract";

export type CreateNotificationPreferenceProps = Pick<NotificationPreferenceProps, "userId">;

export type UpdateNotificationPreferenceProps = Pick<
    NotificationPreferenceProps,
    "accountActivity" | "systemUpdates" | "promotionalUpdates"
>;