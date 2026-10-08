import { UserDeviceRepositoryImpl } from "./userDevice.repository.impl";
import { CredentialRepositoryImpl } from "./credential.repository.impl";
import { NotificationRepositoryImpl } from "./notification.repository.impl";
import { ProcessedEventRepositoryImpl } from "./processedEvent.repository.impl";
import { NotificationPreferenceRepositoryImpl } from "./notificationPreference.repository.impl";
import { ICredentialRepository } from "../../domain/interfaces/repositories/ICredentialRepository";
import { IUserDeviceRepository } from "../../domain/interfaces/repositories/IUserDevice.repository";
import { INotificationRepository } from "../../domain/interfaces/repositories/INotification.repository";
import { IProcessedEventRepository } from "../../domain/interfaces/repositories/IProcessedEvent.repository";
import { INotificationPreferenceRepository } from "../../domain/interfaces/repositories/INotificationPreference.repository";

// notification repository instance
export const notificationRepository: INotificationRepository = new NotificationRepositoryImpl();

export const notificationPreferenceRepository: INotificationPreferenceRepository = new NotificationPreferenceRepositoryImpl();

// userDevice repository instance
export const userDeviceRepository: IUserDeviceRepository = new UserDeviceRepositoryImpl();

// processed event repository instance
export const processedEventRepository: IProcessedEventRepository = new ProcessedEventRepositoryImpl();

// credential repository instance
export const credentialRepository: ICredentialRepository = new CredentialRepositoryImpl();