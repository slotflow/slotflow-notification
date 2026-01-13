import { NotificationProps } from "../contracts/notification.contract";

export type CreateNotificationProps = Omit<NotificationProps, "_id" | "createdAt" | "updatedAt">;

export type UpdateNotificationProps = Omit<NotificationProps, "_id" | "userId" | "createdAt" | "updatedAt">;