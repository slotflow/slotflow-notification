import { NotificationProps } from "../contracts/notification.contract";

export type CreateNotificationProps = Omit<NotificationProps, "_id" | "createdAt" | "updatedAt" | "isRead" | "data"> & Partial<Pick<NotificationProps, "data">>;

export type UpdateNotificationProps = Omit<NotificationProps, "_id" | "userId" | "createdAt" | "updatedAt">;