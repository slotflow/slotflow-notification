import { Types } from "mongoose";
import { INotification } from "../models/notification.model";
import { Notification } from "../../domain/entities/notification.entity";

export class NotificationMapper {

    static toDomain(doc: INotification): Notification {
        return new Notification({
            _id: doc._id.toString(),
            userId: doc.userId.toString(),
            isRead: doc.isRead,
            body: doc.body,
            data: doc.data,
            title: doc.title,
            pushNotification: doc.pushNotification,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    };

    static toPersistence(entity: Notification) {
        
        const props = entity.getProps();

        return {
            userId: new Types.ObjectId(props.userId),
            isRead: props.isRead,
            body: props.body,
            data: props.data,
            title: props.title,
            pushNotification: props.pushNotification,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt
        };
    };

};

