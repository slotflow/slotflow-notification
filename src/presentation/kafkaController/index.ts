import {
    SendOtpEmailUseCase,
    SendWelcomeEmailUseCase,
    SendAdminProviderReviewEmailUseCase,
    SendAccountBlockStatusChangeEmailUseCase,
    SendAcountTrustStatusChangeEmailUseCase,
    SendAppointmentStatusChangeEmailUseCase,
    SendAppConnectEmailUseCase,
    SendProviderTrialSubscriptionEmailUseCase,
    SendPasswordResetEmailUseCase,
    // SendGotAppointmentEventUseCase,
    // SendUserPaymentEmailUseCase,
    // SendProviderPaymentEmailUseCase,
    // SendProviderPayoutEventUseCase,
} from "../../application/useCases/email/emailSend.useCases";
import { SendNotificationUseCase } from "../../application/useCases/notification/sendNotification.useCase";
import { notificationRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";
import { emailService, pushNotificationService } from "../../infrastructure/services";

// import { CreateGoogleCalendarEventUseCase, UpdateGoogleCalendarEventUseCase } from "../application/useCases/googleCalendar.useCases";

export const emailHandlers = {
    sendOtp: new SendOtpEmailUseCase(emailService),
    registerSuccess: new SendWelcomeEmailUseCase(emailService),
    passwordReset: new SendPasswordResetEmailUseCase(emailService),
    adminProviderReview: new SendAdminProviderReviewEmailUseCase(emailService),
    accountBlockStatus: new SendAccountBlockStatusChangeEmailUseCase(emailService),
    accountTrustStatus: new SendAcountTrustStatusChangeEmailUseCase(emailService),
    providerAppointmentStatus: new SendAppointmentStatusChangeEmailUseCase(emailService),
    appConnect: new SendAppConnectEmailUseCase(emailService),
    providerTrialSubscription: new SendProviderTrialSubscriptionEmailUseCase(emailService),

    // googleCalendarCreateRequest: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
    // googleCalendarUpdateRequest: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaClientAdapter),
};

export const notificationHandler = {
    passwordReset: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository)
};