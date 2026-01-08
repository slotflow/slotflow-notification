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
} from "../application/useCases/emailSend.useCases";
import { EmailService } from "../infrastructure/services/email.service";

const emailService = new EmailService();

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

    // createGoogleCalendarEvent
    // updateGoogleCalendarEvent
};