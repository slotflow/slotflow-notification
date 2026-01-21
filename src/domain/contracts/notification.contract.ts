export interface NotificationProps {
    _id: string;
    userId: string;
    title: string;
    body: string;
    pushNotification: boolean;
    isRead: boolean;
    data: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
}