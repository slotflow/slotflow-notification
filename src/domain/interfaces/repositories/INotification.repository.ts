import { Notification } from "../../entities/notification.entity";

export interface INotificationRepository {

    create(notification: Notification): Promise<Notification>;
    
    update(notification: Notification): Promise<Notification>;

    findAll(userId: string, page: number, limit: number): Promise<{ data: Array<Notification>, totalPages: number; currentPage: number; totalCount: number; }>;

};