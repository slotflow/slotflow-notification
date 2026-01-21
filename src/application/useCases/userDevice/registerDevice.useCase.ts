import { log } from "../../../shared/logger/logger";
import { RegisterDeviceRequest } from "../../dtos/common.dtos";
import { IRegisterDeviceUseCase } from "../../dtos/useCase.dtos";
import { UserDevice } from "../../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../../domain/interfaces/repositories/IUserDevice.repository";

export class RegisterDeviceUseCase implements IRegisterDeviceUseCase {
    constructor(
        private readonly userDeviceRepository: IUserDeviceRepository,
    ) { };

    async execute(payload: RegisterDeviceRequest): Promise<void> {
        try {
            const { fcmToken, deviceId, platform, userId } = payload;

            const existing = await this.userDeviceRepository.findByUserIdAndDeviceId(userId, deviceId);
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
        } catch (error) {
            log.error("RegisterDeviceUseCase failed : ", error as Error);
            throw error;
        };
    };
};