import { EmailServiceImpl } from "./email.service.impl";
import { IEmailService } from "../../domain/interfaces/services/IEmail.service";
import { PushNotificationServiceImpl } from "./pushNotification.service.impl";
import { GoogleCalendarGatewayServiceImpl } from "./googleCalendarGatewayService.impl";
import { IPushNotificationService } from "../../domain/interfaces/services/IPushNotification.service";
import { IGoogleCalendarGatewayService } from "../../domain/interfaces/services/IGoogleCalendarGateway.service";

// email service instance
export const emailService: IEmailService = new EmailServiceImpl();

// google calendar service instance
export const googleCalendarGatewayService: IGoogleCalendarGatewayService = new GoogleCalendarGatewayServiceImpl();

// pushNotification service instance
export const pushNotificationService: IPushNotificationService = new PushNotificationServiceImpl();