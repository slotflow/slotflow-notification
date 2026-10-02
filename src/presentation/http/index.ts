import { RegisterDeviceUseCase } from "../../application/useCases/userDevice/registerDevice.useCase";
import { GetNotificationsUseCase } from "../../application/useCases/notification/getNotifications.useCase";
import { GetGoogleCalendarUseCase } from "../../application/useCases/googleCalendar/getGoogleCalendar.useCase";

import { kafkaProducer } from "../../infrastructure/messaging";
import { aesEncryptionService, googleCalendarService } from "../../infrastructure/services";
import { credentialRepository, notificationRepository, userDeviceRepository } from "../../infrastructure/repository";
import { ConnectGoogleCalendarUseCase } from "../../application/useCases/googleCalendar/connectGoogleCalendar.useCase";

export const registerDeviceUseCase = new RegisterDeviceUseCase(userDeviceRepository);

export const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);

export const getGoogleCalendarUseCase = new GetGoogleCalendarUseCase(credentialRepository, aesEncryptionService, googleCalendarService);

export const connectGoogleCalendarUseCase = new ConnectGoogleCalendarUseCase(aesEncryptionService, credentialRepository, kafkaProducer);