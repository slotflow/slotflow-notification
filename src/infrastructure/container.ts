import { EmailServiceImpl } from "./services/email.service";
import { IEmailService } from "../application/service/IEmail.service";
import { GoogleCalendarGatewayServiceImpl } from "./services/googleCalendarGatewayService.impl";
import { IGoogleCalendarGatewayService } from "../domain/interface/services/IGoogleCalendarGateway.service";

export const emailService: IEmailService = new EmailServiceImpl();

export const googleCalendarGatewayService: IGoogleCalendarGatewayService = new GoogleCalendarGatewayServiceImpl();