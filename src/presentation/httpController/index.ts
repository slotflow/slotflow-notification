import { RegisterDeviceUseCase } from "../../application/useCases/registerDevice.useCase";
import { GetAllNotificationsUseCase } from "../../application/useCases/getAllNotifications.useCase";
import { IGetAllNotificationsUseCase, IRegisterDeviceUseCase } from "../../application/dtos/useCase.dtos";

import { notificationRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";

export const registerDeviceUseCase: IRegisterDeviceUseCase = new RegisterDeviceUseCase(userDeviceRepository);

export const getAllNotificationsUseCase: IGetAllNotificationsUseCase = new GetAllNotificationsUseCase(notificationRepository);