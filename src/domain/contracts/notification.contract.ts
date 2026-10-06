import { NotificationType } from "../commands/notification.commands";

export interface NotificationProps {
    _id: string;
    userId: string;
    title: string;
    body: string;
    isRead: boolean;
    type: NotificationType;
    data: Record<string, string> | null;
    createdAt: Date;
    updatedAt: Date;
}