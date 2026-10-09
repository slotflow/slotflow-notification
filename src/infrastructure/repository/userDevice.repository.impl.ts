import { Platform } from "../../domain/enums/enum";
import { UserDeviceModel } from "../models/userDevice.model";
import { UserDeviceMapper } from "../mappers/userDevice.mapper";
import { UserDevice } from "../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../domain/interfaces/repositories/IUserDevice.repository";

export class UserDeviceRepositoryImpl implements IUserDeviceRepository {
  async create(userDevice: UserDevice): Promise<UserDevice> {
    const persistence = UserDeviceMapper.toPersistence(userDevice);

    const doc = await UserDeviceModel.create(persistence);

    return UserDeviceMapper.toDomain(doc);
  }

  async upsert(userDevice: UserDevice): Promise<UserDevice> {
    const persistence = UserDeviceMapper.toPersistence(userDevice);

    const doc = await UserDeviceModel.findOneAndUpdate(
      {
        userId: persistence.userId,
        deviceId: persistence.deviceId,
        platform: persistence.platform,
      },
      {
        $set: {
          fcmToken: persistence.fcmToken,
          isActive: true,
          lastUsedAt: new Date(),
          updatedAt: new Date(),
        },
        $setOnInsert: {
          userId: persistence.userId,
          deviceId: persistence.deviceId,
          platform: persistence.platform,
          createdAt: persistence.createdAt,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return UserDeviceMapper.toDomain(doc);
  }

  async findByUserId(userId: string): Promise<UserDevice[]> {
    const docs = await UserDeviceModel.find({
      userId,
      isActive: true,
    });

    return docs.map((doc) => UserDeviceMapper.toDomain(doc));
  }

  async findByDeviceId(deviceId: string): Promise<UserDevice | null> {
    const doc = await UserDeviceModel.findOne({
      deviceId,
    });

    if (!doc) {
      return null;
    }

    return UserDeviceMapper.toDomain(doc);
  }

  async delete(deviceId: string): Promise<void> {
    await UserDeviceModel.deleteOne({
      deviceId,
    });
  }

  async update(userDevice: UserDevice): Promise<UserDevice> {
    const persistence = UserDeviceMapper.toPersistence(userDevice);

    const doc = await UserDeviceModel.findOneAndUpdate(
      {
        userId: persistence.userId,
        deviceId: persistence.deviceId,
        platform: persistence.platform,
      },
      {
        $set: persistence,
      },
      {
        new: true,
      },
    );

    if (!doc) {
      throw new Error("User device not found");
    }

    return UserDeviceMapper.toDomain(doc);
  }

  async findUnique(
    userId: string,
    deviceId: string,
    platform: Platform,
  ): Promise<UserDevice | null> {
    const doc = await UserDeviceModel.findOne({
      userId,
      deviceId,
      platform,
    });

    if (!doc) {
      return null;
    }

    return UserDeviceMapper.toDomain(doc);
  }
}
