import { kafkaProducer } from "../../infrastructure/messaging";
import { SendEmailUseCase } from "../../application/useCases/kafka/email/emailSend.useCases";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";
import { SendNotificationUseCase } from "../../application/useCases/kafka/notification/sendNotification.useCase";
import { emailService, googleCalendarGatewayService, pushNotificationService } from "../../infrastructure/services";
import { notificationRepository, processedEventRepository, userDeviceRepository } from "../../infrastructure/repositoryImpls";
import { UpdateGoogleCalendarEventUseCase } from "../../application/useCases/kafka/GoogleCalendar/updateGoogleCalendar.useCase";
import { CreateGoogleCalendarEventUseCase } from "../../application/useCases/kafka/GoogleCalendar/createGoogleCalendar.useCases";

// process event wrapper use case
export const processEventWrapperUseCase = new ProcessEventWrapperUseCase(processedEventRepository, kafkaProducer);
const sendEmail = new SendEmailUseCase(emailService)

export const emailHandlers = {
    sendOtp: sendEmail,
    registerSuccess: sendEmail,
    passwordReset: sendEmail,
    adminProviderReview: sendEmail,
    accountBlockStatus: sendEmail,
    accountTrustStatus: sendEmail,
    providerAppointmentStatusForUser: sendEmail,
    appConnect: sendEmail,
    providerSubscriptionPaymentSuccess: sendEmail,
    planSubscribed: sendEmail,
    slotBooked: sendEmail,
    userBookingPaymentSuccess: sendEmail,
    gotAnAppointment: sendEmail,
    userBookingRefundPaymentSuccess: sendEmail,
};

const sendNotification = new SendNotificationUseCase(notificationRepository, pushNotificationService, userDeviceRepository);
export const notificationHandler = {
    accountBlockStatus: sendNotification,
    accountTrustStatus: sendNotification,
    providerAppointmentStatusForUser: sendNotification,
    providerAppointmentStatusForProvider: sendNotification,
    appConnect: sendNotification,
    providerSubscriptionPaymentSuccess: sendNotification,
    providerSubscriptionPaymentFailed: sendNotification,
    planSubscribed: sendNotification,
    slotBooked: sendNotification,
    userBookingPaymentSuccess: sendNotification,
    stripeAccountStatusUpdated: sendNotification,
    passwordUpdate: sendNotification,
    gotAnAppointment: sendNotification,
    userBookingRefundPaymentSuccess: sendNotification,
};

export const calendarHandler = {
    createGoogleCalendarEvent: new CreateGoogleCalendarEventUseCase(googleCalendarGatewayService, kafkaProducer),
    updateGoogleCalendarEvent: new UpdateGoogleCalendarEventUseCase(googleCalendarGatewayService),
};