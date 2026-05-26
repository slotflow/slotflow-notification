import { NotificationModel } from "../models/notification.model";
import { NotificationMapper } from "../mappers/notification.mapper";
import { Notification } from "../../domain/entities/notification.entity";
import { INotificationRepository } from "../../domain/interfaces/repositories/INotification.repository";

export class NotificationRepositoryImpl implements INotificationRepository {

    async create(notification: Notification): Promise<Notification> {
        const persistence = NotificationMapper.toPersistence(notification);
        const doc = await NotificationModel.create(persistence);
        return NotificationMapper.toDomain(doc);
    }

    async update(notification: Notification): Promise<Notification> {
        const persistence = NotificationMapper.toPersistence(notification);
        const doc = await NotificationModel.findByIdAndUpdate(
            notification._id,
            { $set: persistence },
            { new: true }
        );

        if (!doc) {
            throw new Error("Notification not found");
        }

        return NotificationMapper.toDomain(doc);
    };

    async findAll(userId: string, page: number = 1, limit: number = 20): Promise<{ items: Array<Notification>, totalPages: number; currentPage: number; totalCount: number; }> {
        const skip = (page - 1) * limit;
        const [notifications, totalCount] = await Promise.all([
            NotificationModel.find({ userId }, {
                _id: 1,
                userId: 1,
                body: 1,
                title: 1,
                data: 1,
                pushNotification: 1,
                isRead: 1,
                createdAt: 1
            }).sort({ createdAt: -1}).skip(skip).limit(limit).lean(),
            NotificationModel.countDocuments({ userId }),
        ]);
        const totalPages = Math.ceil(totalCount / limit);
        return {
            items: notifications.map(notification => NotificationMapper.toDomain(notification)),
            totalPages,
            currentPage: page,
            totalCount
        };
    };

};