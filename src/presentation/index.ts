import {
    SendOtpEventUseCase,
    SendWelcomeEventUseCase,
    SendAdminProviderReviewEventUseCase,
    SendAccountBlockStatusEventUseCase,
    SendAcountTrustStatusEventUseCase,
    SendGotAppointmentEventUseCase,
    // SendUserPaymentEmailUseCase,
    // SendGoogleConnectEmailUseCase,
    // SendAccountBlockedEmailUseCase,
    // SendAccountTrustedEmailUseCase,
    // SendGotAppointmentEmailUseCase,
    // SendProviderPayoutEmailUseCase,
    // SendAccountUnblockedEmailUseCase,
    // SendAccountUntrustedEmailUseCase,
    // SendRejectAppointmentEmailUseCase,
    // SendConfirmAppointmentEmailUseCase,
    // SendProviderStripeAccountEmailUseCase,
    // SendProviderConfirmSubscriptionEmailUseCase,
} from "../application/useCases/emailSend.useCases";
import { EmailService } from "../infrastructure/services/email.service";    

const emailService = new EmailService();

export const handlers = {
    sendOtp: new SendOtpEventUseCase(emailService),
    registerSuccess: new SendWelcomeEventUseCase(emailService),
    adminProviderReview: new SendAdminProviderReviewEventUseCase(emailService),
    accountBlockStatus: new SendAccountBlockStatusEventUseCase(emailService),
    accountTrustStatus: new SendAcountTrustStatusEventUseCase(emailService),
    gotAppointment: new SendGotAppointmentEventUseCase(emailService),

    // accountBlocked: new SendAccountBlockedEmailUseCase(emailService),
    // accountUnblocked: new SendAccountUnblockedEmailUseCase(emailService),

    // accountTrusted: new SendAccountTrustedEmailUseCase(emailService),
    // accountUntrusted: new SendAccountUntrustedEmailUseCase(emailService),

    // confirmAppointment: new SendConfirmAppointmentEmailUseCase(emailService),
    // rejectAppointment: new SendRejectAppointmentEmailUseCase(emailService),

    // userPayment: new SendUserPaymentEmailUseCase(emailService),
    // providerPayout: new SendProviderPayoutEmailUseCase(emailService),

    // stripeConnect: new SendProviderStripeAccountEmailUseCase(emailService),
    // googleConnect: new SendGoogleConnectEmailUseCase(emailService),

    // confirmSubscription: new SendProviderConfirmSubscriptionEmailUseCase(emailService),

    // createGoogleCalendarEvent
    // updateGoogleCalendarEvent
};