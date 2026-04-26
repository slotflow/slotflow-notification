import { RegisterDeviceUseCase } from "../../application/useCases/userDevice/registerDevice.useCase";
import { GetNotificationsUseCase } from "../../application/useCases/notification/getNotifications.useCase";

import { notificationRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";

export const registerDeviceUseCase = new RegisterDeviceUseCase(userDeviceRepository);

export const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);