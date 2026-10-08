import { NotificationPreferenceModel } from "../models/notificationPreference.model";
import { NotificationPreferenceMapper } from "../mappers/notificationPreference.mapper";
import { NotificationPreference } from "../../domain/entities/notificationPreference.entity";
import { INotificationPreferenceRepository } from "../../domain/interfaces/repositories/INotificationPreference.repository";

export class NotificationPreferenceRepositoryImpl implements INotificationPreferenceRepository {
    async create(notificationPreference: NotificationPreference): Promise<NotificationPreference> {
        const persistence = NotificationPreferenceMapper.toPersistence(notificationPreference);
        const doc = await NotificationPreferenceModel.create(persistence);
        return NotificationPreferenceMapper.toDomain(doc);
    };

    async update(notificationPreference: NotificationPreference): Promise<NotificationPreference> {
        const persistence = NotificationPreferenceMapper.toPersistence(notificationPreference);
        const doc = await NotificationPreferenceModel.findByIdAndUpdate(
            notificationPreference._id,
            { $set: persistence },
            { new: true },
        );

        if (!doc) {
            throw new Error("Notification preference not found");
        }

        return NotificationPreferenceMapper.toDomain(doc);
    };

    async findById(id: string): Promise<NotificationPreference | null> {
        const doc = await NotificationPreferenceModel.findById(id);
        if (!doc) return null;
        return NotificationPreferenceMapper.toDomain(doc);
    };

    async findByUserId(userId: string): Promise<NotificationPreference | null> {
        const doc = await NotificationPreferenceModel.findOne({ userId });
        if (!doc) return null;
        return NotificationPreferenceMapper.toDomain(doc);
    };
};
