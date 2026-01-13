import { log } from "../../shared/logger/logger";
import { RegisterDeviceRequest } from "../dtos/common.dtos";
import { IRegisterDeviceUseCase } from "../dtos/useCase.dtos";
import { UserDevice } from "../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../domain/interfaces/repositories/IUserDevice.repository";

export class RegisterDeviceUseCase implements IRegisterDeviceUseCase{
    constructor(
        private readonly userDeviceRepository: IUserDeviceRepository,
    ) { };

    async execute(payload: RegisterDeviceRequest): Promise<void> {
        try {
            const { fcmToken, deviceId, platform, userId } = payload;

            const userDevice = UserDevice.create({
                fcmToken,
                deviceId,
                userId,
                platform,
            });

            await this.userDeviceRepository.create(userDevice);
        } catch (error) {
            log.error("RegisterDeviceUseCase failed : ",error as Error);
            throw error;
        };
    };
};