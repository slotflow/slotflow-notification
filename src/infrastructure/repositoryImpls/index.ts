// repository instance

import { UserDeviceRepositoryImpl } from "./userDevice.repository.impl";
import { NotificationRepositoryImpl } from "./notification.repository.impl";
import { IUserDeviceRepository } from "../../domain/interfaces/repositories/IUserDevice.repository";
import { INotificationRepository } from "../../domain/interfaces/repositories/INotification.repository";

// notification repository instance
export const notificationRepository: INotificationRepository = new NotificationRepositoryImpl();

// userDevice repository instance
export const userDeviceRepository: IUserDeviceRepository = new UserDeviceRepositoryImpl();

