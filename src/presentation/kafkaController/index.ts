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
    SendProviderPaymentEventUseCase,
} from "../../application/useCases/email/emailSend.useCases";
import { kafkaProducer } from "../../infrastructure/messaging";
import { notificationRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";
import { SendNotificationUseCase } from "../../application/useCases/notification/sendNotification.useCase";
import { emailService, googleCalendarGatewayService, pushNotificationService } from "../../infrastructure/services";
import { CreateGoogleCalendarEventUseCase, UpdateGoogleCalendarEventUseCase } from "../../application/useCases/GoogleCalendar/googleCalendar.useCases";

export const emailHandlers = {
    sendOtp: new SendOtpEmailUseCase(emailService),
    registerSuccess: new SendWelcomeEmailUseCase(emailService),
    passwordReset: new SendPasswordResetEmailUseCase(emailService),
    adminProviderReview: new SendAdminProviderReviewEmailUseCase(emailService),
    accountBlockStatus: new SendAccountBlockStatusChangeEmailUseCase(emailService),
    accountTrustStatus: new SendAcountTrustStatusChangeEmailUseCase(emailService),
    providerAppointmentStatusForUser: new SendAppointmentStatusChangeEmailUseCase(emailService),
    appConnect: new SendAppConnectEmailUseCase(emailService),
    providerTrialSubscription: new SendProviderTrialSubscriptionEmailUseCase(emailService),
    providerSubscriptionPaymentSuccess: new SendProviderPaymentEventUseCase(emailService),
};

export const notificationHandler = {
    passwordReset: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    appConnect: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    accountBlockStatus: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    adminProviderReview: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    accountTrustStatus: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerAppointmentStatusForUser: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerAppointmentStatusForProvider: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerTrialSubscription: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerSubscriptionPaymentSuccess: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
};

export const calendarHandler = {
    createGoogleCalendar: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
    updateGoogleCalendar: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
};