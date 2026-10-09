import { RegisterDeviceInput } from "../../dtos/common.dto";
import { UserDevice } from "../../../domain/entities/userDevice.entity";
import { IUserDeviceRepository } from "../../../domain/interfaces/repositories/IUserDevice.repository";

export class RegisterDeviceUseCase {
  constructor(private readonly userDeviceRepository: IUserDeviceRepository) {}

  async execute(input: RegisterDeviceInput): Promise<void> {
    const { fcmToken, deviceId, platform, userId } = input;
    const userDevice = UserDevice.create({
      userId,
      fcmToken,
      deviceId,
      platform,
    });

    await this.userDeviceRepository.upsert(userDevice);
  }
}
