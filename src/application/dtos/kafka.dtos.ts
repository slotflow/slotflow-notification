import { KafkaMessage } from "kafkajs";
import { AdminVerificationStatus, AppConnect, AppointmentStatus, NotificationType, OtpPurpose, PaymentFor, PaymentGateway, PaymentStatus, Role } from "../../domain/enums/enum";

// **** COMMON DTOS

// kafka client adapter props
export interface KafkaClientAdapterProps {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

export interface EventEnvelope<T> {
    eventId: string;
    occurredAt: Date;
    attempt: number;
    maxAttempts: number;
    payload: T;
}


// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;

export interface UpdateGoogleCalendarEventRequest {
    eventId: string,
    appointmentDate: Date,
    appointmentStatus: AppointmentStatus,
    accessToken: string,
}

export interface CreateGoogleCalendarEventRequest {
    appointmentDate: Date,
    appointmentStatus: AppointmentStatus,
    accessToken: string;
}


// **** KAFKA EVENTS PAYLOAD

// send email common
export interface SendEmailCommon {
    email: string;
    name: string;
}

// send notification common
export interface SendNotificationCommon {
    body: string;
    pushNotification: boolean;
    title: string;
    data?: Record<string, string>;
}

// send otp event for registration and password update
export interface SendOtpEvent extends SendEmailCommon {
    otp: string;
    purpose: OtpPurpose;
}

// send welcome event
export interface SendWelcomeEvent extends SendEmailCommon {
    role: Role;
}

// send reset password
export interface SendResetPasswordEvent extends SendEmailCommon { };

// send account block status event
export interface SendAccountBlockStatusEvent extends SendEmailCommon, SendNotificationCommon {
    blocked: boolean;
    reason?: string;
    userId: string;
}

// send admin provider review event
export interface SendAdminProviderReviewEvent extends SendEmailCommon, SendNotificationCommon {
    status: AdminVerificationStatus;
    reason?: string;
}

// send account trust status event
export interface SendAccountTrustStatusEvent extends SendEmailCommon, SendNotificationCommon {
    trusted: boolean;
    userId: string; // providerId ( admin perspective it is user id )
    reason?: string;
}

// send appointment status change for user event
export interface SendAppointmentStatusChangeForUserEvent extends SendEmailCommon, SendNotificationCommon {
    userId: string;
    userAccessToken: string;
    data: {
        appointmentDate: string;
        appointmentTime: string;
        appointmentMode: string;
        appointmentStatus: AppointmentStatus;
        notificationType: NotificationType;
    }
}

// send appointment status change for provider event
export interface SendAppointmentStatusChangeForProviderEvent extends SendNotificationCommon {
    userId: string;
    userAccessToken: string;
    data: {
        appointmentDate: string;
        appointmentTime: string;
        appointmentMode: string;
        appointmentStatus: AppointmentStatus;
        notificationType: NotificationType;
    }
}

// send app connect event
export interface SendAppConnectEvent extends SendEmailCommon {
    appConnect: AppConnect;
    userOrProviderId: string;
}

// send provider trial subscription event
export interface SendProviderTrialSubscriptionEvent extends SendEmailCommon, SendNotificationCommon {
    startDate: string;
    endDate: string;
    userId: string;
}

// Added till this 

// send user payment event
export interface SendUserPaymentEvent extends SendEmailCommon {
    amount: number;
    transactionId: string;
    paymentDate: string;
    appointmentDate: string;
    paymentStatus: PaymentStatus;
    paymentFor: PaymentFor;
}

// send provider payment event
export interface SendProviderPaymentEvent extends SendEmailCommon {
    amount: number;
    transactionId: string;
    paymentDate: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    paymentStatus: PaymentStatus;
    paymentFor: PaymentFor;
}

// send provider payout event
export interface SendProviderPayoutEvent extends SendEmailCommon {
    amount: number;
    transactionId: string;
    payoutDate: string;
}

// send payment request event
export interface SendPaymentRequestEvent {
    transactionId: string,
    paymentStatus: string,
    paymentMethod: string,
    paymentGateway: PaymentGateway,
    paymentFor: PaymentFor,
    initialAmount: number,
    discountAmount: number,
    totalAmount: number,
    providerId?: string,
    userId?: string,
}


// Google Calendar

// create google calendar event
export interface CreateGoogleCalendarEvent {
  bookingId: string;
  role: Role;
  targetId: string; 
  accessToken: string;
  appointmentDate: Date;
  appointmentStatus: AppointmentStatus;
}

// create google calendar event success result
export interface CreateGoogleCalendarEventSuccessResult {
    bookingId: string;
    role: Role;
    eventId: string;
}

// create google calendar event failed result
export interface CreateGoogleCalendarEventFailedResult {
    bookingId: string;
    role: Role;
    error: string;
}

// update google calendar event
export interface UpdateGoogleCalendarEvent {
    accessToken: string;
    eventId: string;
    appointmentDate: Date;
    appointmentStatus: AppointmentStatus;
    bookingId: string;
    role: Role;
}