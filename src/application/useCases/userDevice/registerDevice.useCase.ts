import { RegisterDeviceRequest } from "../../dtos/common.dtos";
import { UserDevice } from "../../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../../domain/interfaces/repositories/IUserDevice.repository";

export class RegisterDeviceUseCase {
    constructor(
        private readonly userDeviceRepository: IUserDeviceRepository,
    ) { };

    async execute(payload: RegisterDeviceRequest): Promise<void> {
        const { fcmToken, deviceId, platform, userId } = payload;
        const existing = await this.userDeviceRepository.findUnique(userId, deviceId, platform);
        if (existing) {
            existing.updateToken(fcmToken);
            await this.userDeviceRepository.update(existing);
            return;
        };

        const userDevice = UserDevice.create({
            fcmToken,
            deviceId,
            userId,
            platform,
        });

        await this.userDeviceRepository.create(userDevice);
        return;
    };
};