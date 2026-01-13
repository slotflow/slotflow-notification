import { UserDeviceModel } from "../models/userDevice.model";
import { UserDeviceMapper } from "../mappers/userDevice.mapper";
import { UserDevice } from "../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../domain/interfaces/repositories/IUserDevice.repository";

export class UserDeviceRepositoryImpl implements IUserDeviceRepository {

    async create(userDevice: UserDevice): Promise<UserDevice> {
        const persistence = UserDeviceMapper.toPersistence(userDevice);

        const doc = await UserDeviceModel.findOneAndUpdate(
            { deviceId: persistence.deviceId },
            { $set: persistence },
            { upsert: true, new: true }
        );

        return UserDeviceMapper.toDomain(doc);
    }

    async findByUserId(userId: string): Promise<Array<UserDevice>> {
        const docs = await UserDeviceModel.find({ userId, isActive: true });
        return docs.map(doc => UserDeviceMapper.toDomain(doc));
    }

    async findByDeviceId(deviceId: string): Promise<UserDevice | null> {
        const doc = await UserDeviceModel.findOne({ deviceId });
        if (!doc) return null;
        return UserDeviceMapper.toDomain(doc);
    }

    async delete(deviceId: string): Promise<void> {
        await UserDeviceModel.deleteOne({ deviceId });
    }
}
