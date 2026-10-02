import { NotificationProps } from "../contracts/notification.contract";

// Notification Type
export type NotificationType =
  | 'account_activity'
  | 'system_updates'
  | 'promotional_updates';

  
export type CreateNotificationProps = Omit<NotificationProps, "_id" | "createdAt" | "updatedAt" | "isRead" | "data"> & Partial<Pick<NotificationProps, "data">>;

export type UpdateNotificationProps = Omit<NotificationProps, "_id" | "userId" | "createdAt" | "updatedAt">;