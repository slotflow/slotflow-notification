import { kafkaProducer } from "../../infrastructure/messaging";
import {
    SendOtpEmailUseCase,
    SendWelcomeEmailUseCase,
    SendSlotBookedEventUseCase,
    SendAppConnectEmailUseCase,
    SendPasswordResetEmailUseCase,
    SendGotAnAppointmentEmailUseCase,
    SendPlanSubscribedEventInputUseCase,
    SendAdminProviderReviewEmailUseCase,
    SendBookingPaymentSuccessEventUseCase,
    SendAcountTrustStatusChangeEmailUseCase,
    SendAppointmentStatusChangeEmailUseCase,
    SendAccountBlockStatusChangeEmailUseCase,
    SendProviderTrialSubscriptionEmailUseCase,
    SendSubscriptionPaymentSuccessEventUseCase,
} from "../../application/useCases/kafka/email/emailSend.useCases";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";
import { SendNotificationUseCase } from "../../application/useCases/kafka/notification/sendNotification.useCase";
import { emailService, googleCalendarGatewayService, pushNotificationService } from "../../infrastructure/services";
import { notificationRepository, processedEventRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";
import { UpdateGoogleCalendarEventUseCase } from "../../application/useCases/kafka/GoogleCalendar/updateGoogleCalendar.useCase";
import { CreateGoogleCalendarEventUseCase } from "../../application/useCases/kafka/GoogleCalendar/createGoogleCalendar.useCases";

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
    planSubscribed: new SendPlanSubscribedEventInputUseCase(emailService),
    slotBooked: new SendSlotBookedEventUseCase(emailService),
    gotAnAppointment: new SendGotAnAppointmentEmailUseCase(emailService),
};

const sendNotification = new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository);
export const notificationHandler = {
    passwordReset: sendNotification,
    accountBlockStatus: sendNotification,
    accountTrustStatus: sendNotification,
    providerAppointmentStatusForUser: sendNotification,
    providerAppointmentStatusForProvider: sendNotification,
    appConnect: sendNotification,
    providerTrialSubscription: sendNotification,
    providerSubscriptionPaymentSuccess: sendNotification,
    userBookingPaymentSuccess: sendNotification,
    planSubscribed: sendNotification,
    slotBooked: sendNotification,
    gotAnAppointment: sendNotification,
    passwordUpdate: sendNotification,
};

export const calendarHandler = {
    createGoogleCalendarEvent: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
    updateGoogleCalendarEvent: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
};