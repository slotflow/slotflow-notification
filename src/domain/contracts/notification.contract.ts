export interface NotificationProps {
    _id: string;
    userId: string;
    message: string;
    pushNotification: boolean;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}