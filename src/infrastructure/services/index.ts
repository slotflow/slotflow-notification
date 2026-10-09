import { EmailServiceImpl } from "./email.service.impl";
import { AesEncryptionServiceImpl } from "./aesEncryption.service.impl";
import { PushNotificationServiceImpl } from "./pushNotification.service.impl";
import { IEmailService } from "../../application/interfaces/services/IEmail.service";
import { GoogleCalendarGatewayServiceImpl } from "./googleCalendarGateway.service.impl";
import { IAesEncryptionService } from "../../application/interfaces/security/IAesEncryption.service";
import { IPushNotificationService } from "../../application/interfaces/services/IPushNotification.service";
import { IGoogleCalendarService } from "../../application/interfaces/services/IGoogleCalendarGateway.service";
import { IGoogleTokenService } from "../../application/interfaces/services/IGoogleToken.service";
import { GoogleTokenServiceImpl } from "./googleToken.service.impl";
import { credentialRepository } from "../repository";
import { IGoogleRefreshTokenService } from "../../application/interfaces/services/IGoogleRefreshToken.service";
import { GoogleRefreshTokenServiceImpl } from "./googleRefreshToken.service.impl";

// email service instance
export const emailService: IEmailService = new EmailServiceImpl();

// google calendar service instance
export const googleCalendarService: IGoogleCalendarService = new GoogleCalendarGatewayServiceImpl();

// pushNotification service instance
export const pushNotificationService: IPushNotificationService = new PushNotificationServiceImpl();

// aesEncryption service instance
export const aesEncryptionService: IAesEncryptionService = new AesEncryptionServiceImpl();

// google refresh token service instance
export const googleRefreshTokenService: IGoogleRefreshTokenService =
  new GoogleRefreshTokenServiceImpl();

// google Token service intance
export const googleTokenService: IGoogleTokenService = new GoogleTokenServiceImpl(
  credentialRepository,
  aesEncryptionService,
  googleRefreshTokenService,
);
