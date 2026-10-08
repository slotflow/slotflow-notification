import { Platform } from "../../enums/enum";
import { UserDevice } from "../../entities/userDevice.entity";

export interface IUserDeviceRepository {
    create(userDevice: UserDevice): Promise<UserDevice>;

    upsert(userDevice: UserDevice): Promise<UserDevice>;

    update(userDevice: UserDevice): Promise<UserDevice>;

    findByUserId(userId: string): Promise<UserDevice[]>;

    findByDeviceId(deviceId: string): Promise<UserDevice | null>;
    findUnique(
        userId: string,
        deviceId: string,
        platform: Platform
    ): Promise<UserDevice | null>;
    
    delete(deviceId: string): Promise<void>;
}