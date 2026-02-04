import { RegisterDeviceUseCase } from "../../application/useCases/userDevice/registerDevice.useCase";
import { IGetAllNotificationsUseCase, IRegisterDeviceUseCase } from "../../application/dtos/useCase.dtos";
import { GetAllNotificationsUseCase } from "../../application/useCases/notification/getAllNotifications.useCase";

import { notificationRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";

export const registerDeviceUseCase: IRegisterDeviceUseCase = new RegisterDeviceUseCase(userDeviceRepository);

export const getAllNotificationsUseCase: IGetAllNotificationsUseCase = new GetAllNotificationsUseCase(notificationRepository);