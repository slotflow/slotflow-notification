import {
    SendOtpEmailUseCase,
    SendWelcomeEmailUseCase,
    SendAppConnectEmailUseCase,
    SendPasswordResetEmailUseCase,
    SendSlotBookedEventUseCase,
    SendAdminProviderReviewEmailUseCase,
    SendBookingPaymentSuccessEventUseCase,
    SendPlanSubscribedEventUseCase,
    SendAcountTrustStatusChangeEmailUseCase,
    SendAppointmentStatusChangeEmailUseCase,
    SendAccountBlockStatusChangeEmailUseCase,
    SendProviderTrialSubscriptionEmailUseCase,
    SendSubscriptionPaymentSuccessEventUseCase,
    SendGotAnAppointmentEmailUseCase,
} from "../../application/useCases/email/emailSend.useCases";
import { kafkaProducer } from "../../infrastructure/messaging";
import { notificationRepository, processedEventRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";
import { SendNotificationUseCase } from "../../application/useCases/notification/sendNotification.useCase";
import { emailService, googleCalendarGatewayService, pushNotificationService } from "../../infrastructure/services";
import { CreateGoogleCalendarEventUseCase, UpdateGoogleCalendarEventUseCase } from "../../application/useCases/GoogleCalendar/googleCalendar.useCases";
import { ProcessEventWrapperUseCase } from "../../application/useCases/processEventWrapper.useCase";

// process event wrapper use case
export const processEventWrapperUseCase = new ProcessEventWrapperUseCase(processedEventRepository, kafkaProducer);

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
    providerSubscriptionPaymentSuccess: new SendSubscriptionPaymentSuccessEventUseCase(emailService),
    userBookingPaymentSuccess: new SendBookingPaymentSuccessEventUseCase(emailService),
    planSubscribed: new SendPlanSubscribedEventUseCase(emailService),
    slotBooked: new SendSlotBookedEventUseCase(emailService),
    gotAnAppointment: new SendGotAnAppointmentEmailUseCase(emailService),
};

export const notificationHandler = {
    passwordReset: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    accountBlockStatus: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    accountTrustStatus: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerAppointmentStatusForUser: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerAppointmentStatusForProvider: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    appConnect: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerTrialSubscription: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    providerSubscriptionPaymentSuccess: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    userBookingPaymentSuccess: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    planSubscribed: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    slotBooked: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
    gotAnAppointment: new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository),
};

export const calendarHandler = {
    createGoogleCalendarEvent: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
    updateGoogleCalendarEvent: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
};