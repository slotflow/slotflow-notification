import { UserDevice } from "../../entities/userDevice.entity";

export interface IUserDeviceRepository {

    create(userDevice: UserDevice): Promise<UserDevice>;

    findByUserId(userId: string): Promise<Array<UserDevice>>;

    findByDeviceId(deviceId: string): Promise<UserDevice | null>;

    delete(deviceId: string): Promise<void>;

};
