import {
    SendOtpEventUseCase,
    SendWelcomeEventUseCase,
    SendAdminProviderReviewEventUseCase,
    SendAccountBlockStatusChangeEventUseCase,
    SendAcountTrustStatusChangeEventUseCase,
    SendGotAppointmentEventUseCase,
    SendAppointmentStatusChangeEventUseCase,
    SendUserPaymentEventUseCase,
    SendProviderPaymentEventUseCase,
    SendProviderPayoutEventUseCase,
    SendAppConnectEventUseCase,
    SendProviderTrialSubscriptionEventUseCase,
} from "../application/useCases/emailSend.useCases";
import { kafkaClientAdapter } from "../infrastructure/messaging";
import { emailService, googleCalendarGatewayService } from "../infrastructure/container";
import { CreateGoogleCalendarEventUseCase, UpdateGoogleCalendarEventUseCase } from "../application/useCases/googleCalendar.useCases";

export const handlers = {
    sendOtp: new SendOtpEventUseCase(emailService),
    registerSuccess: new SendWelcomeEventUseCase(emailService),
    adminProviderReview: new SendAdminProviderReviewEventUseCase(emailService),
    accountBlockStatus: new SendAccountBlockStatusChangeEventUseCase(emailService),
    accountTrustStatus: new SendAcountTrustStatusChangeEventUseCase(emailService),
    gotAppointment: new SendGotAppointmentEventUseCase(emailService),
    appointmentStatus: new SendAppointmentStatusChangeEventUseCase(emailService),
    userPayment: new SendUserPaymentEventUseCase(emailService),
    providerPayment: new SendProviderPaymentEventUseCase(emailService),
    providerPayout: new SendProviderPayoutEventUseCase(emailService),
    appConnect: new SendAppConnectEventUseCase(emailService),
    trialSubscription: new SendProviderTrialSubscriptionEventUseCase(emailService),

    googleCalendarCreateRequest: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
    googleCalendarUpdateRequest: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
};