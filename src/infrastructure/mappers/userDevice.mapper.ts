import { Types } from "mongoose";
import { IUserDevice } from "../models/userDevice.model";
import { UserDevice } from "../../domain/entities/userDevice.entity";

export class UserDeviceMapper {

    static toDomain(doc: IUserDevice): UserDevice {
        return new UserDevice({
            _id: doc._id.toString(),
            userId: doc.userId.toString(),
            fcmToken: doc.fcmToken,
            platform: doc.platform,
            deviceId: doc.deviceId,
            isActive: doc.isActive,
            lastUsedAt: doc.lastUsedAt,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    };

    static toPersistence(entity: UserDevice) {
        const props = entity.getProps();

        return {
            userId: new Types.ObjectId(props.userId),
            fcmToken: props.fcmToken,
            platform: props.platform,
            deviceId: props.deviceId,
            isActive: props.isActive,
            lastUsedAt: props.lastUsedAt,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt
        };
    };

};
