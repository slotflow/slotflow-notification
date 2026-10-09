import { Types } from "mongoose";
import { INotificationPreference } from "../models/notificationPreference.model";
import { NotificationPreference } from "../../domain/entities/notificationPreference.entity";

export class NotificationPreferenceMapper {
  static toDomain(doc: INotificationPreference): NotificationPreference {
    return new NotificationPreference({
      _id: doc._id.toString(),
      userId: doc.userId.toString(),
      accountActivity: {
        email: doc.accountActivity.email,
        push: doc.accountActivity.push,
        inApp: doc.accountActivity.inApp,
        sms: doc.accountActivity.sms,
      },
      systemUpdates: {
        email: doc.systemUpdates.email,
        push: doc.systemUpdates.push,
        inApp: doc.systemUpdates.inApp,
        sms: doc.systemUpdates.sms,
      },
      promotionalUpdates: {
        email: doc.promotionalUpdates.email,
        push: doc.promotionalUpdates.push,
        inApp: doc.promotionalUpdates.inApp,
        sms: doc.promotionalUpdates.sms,
      },
      createdAt: doc.createdAt,
      updatedDate: doc.updatedDate,
    });
  }

  static toPersistence(entity: NotificationPreference) {
    const props = entity.getProps();

    return {
      userId: new Types.ObjectId(props.userId),
      accountActivity: props.accountActivity,
      systemUpdates: props.systemUpdates,
      promotionalUpdates: props.promotionalUpdates,
      createdAt: props.createdAt,
      updatedDate: props.updatedDate,
    };
  }
}
