import {
    SendOtpEventUseCase,
    SendWelcomeEventUseCase,
    SendAdminProviderReviewEventUseCase,
    SendAccountBlockStatusChangeEventUseCase,
    SendAcountTrustStatusChangeEventUseCase,
    SendAppointmentStatusChangeEventUseCase,
    SendAppConnectEventUseCase,
    SendProviderTrialSubscriptionEventUseCase,
    SendPasswordResetEventUseCase,
    // SendGotAppointmentEventUseCase,
    SendUserPaymentEventUseCase,
    SendProviderPaymentEventUseCase,
    SendProviderPayoutEventUseCase,
} from "../../application/useCases/emailSend.useCases";
import { emailService } from "../../infrastructure/container";

// import { CreateGoogleCalendarEventUseCase, UpdateGoogleCalendarEventUseCase } from "../application/useCases/googleCalendar.useCases";

export const emailHandlers = {        
    sendOtp: new SendOtpEventUseCase(emailService),
    registerSuccess: new SendWelcomeEventUseCase(emailService),
    passwordReset: new SendPasswordResetEventUseCase(emailService),
    adminProviderReview: new SendAdminProviderReviewEventUseCase(emailService),
    accountBlockStatus: new SendAccountBlockStatusChangeEventUseCase(emailService),
    accountTrustStatus: new SendAcountTrustStatusChangeEventUseCase(emailService),
    providerAppointmentStatus: new SendAppointmentStatusChangeEventUseCase(emailService),
    appConnect: new SendAppConnectEventUseCase(emailService),
    providerTrialSubscription: new SendProviderTrialSubscriptionEventUseCase(emailService),

    // googleCalendarCreateRequest: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
    // googleCalendarUpdateRequest: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
};