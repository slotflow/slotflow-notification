import { KafkaMessage } from "kafkajs";
import { AdminVerificationStatus, AppConnect, AppointmentStatus, OtpPurpose, PaymentFor, PaymentGateway, PaymentStatus, Role } from "../../domain/enums/enum";

// **** KAFKA COMMON DTOS

// kafka client adapter props
export interface KafkaClientAdapterProps {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

// backend-main service subscribing kafka event payload
export interface NSSubKafkaEventPayload {
    emailData: any;
    notificationData: any;
    calendarData: any;
}

// dlq metadata
export interface DqMetaData {
    service: string;
    originalTopic: string;
    error: string;
    failedAt: Date;
    retryCount?: number;
}

// event envelope
export interface EventEnvelope<NSSubKafkaEventPayload, M = DqMetaData> {
    eventId: string;
    occurredAt: Date;
    attempt: number;
    maxAttempts: number;
    payload: NSSubKafkaEventPayload;
    metadata?: M;
}

// process event wrapper input
export interface ProcessEventWrapperInput {
    topic: string,
    eventData: EventEnvelope<NSSubKafkaEventPayload>,
    businessUseCase: { execute: (data: any) => Promise<void> }
    payloadExtractor: (payload: NSSubKafkaEventPayload) => any;
}

// send email common
export interface SendEmailCommon {
    email: string;
    name: string;
}

// send notification common
export interface SendNotificationCommon {
    userId: string;
    body: string;
    pushNotification: boolean;
    title: string;
    data?: Record<string, string>;
}

// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;


// **** KAFKA EVENTS PAYLOAD

// **** subscribing events

// send otp event for registration and password update
export interface SendOtpEventInput extends SendEmailCommon {
    otp: string;
    purpose: OtpPurpose;
}

// send welcome event
export interface SendWelcomeEventInput extends SendEmailCommon {
    role: Role;
}

// send reset password
export interface SendResetPasswordEventInput extends SendEmailCommon { };

// send admin provider review event
export interface SendAdminProviderReviewEventInput extends SendEmailCommon {
    status: AdminVerificationStatus;
    reason?: string;
}

// send account block status event
export interface SendAccountBlockStatusEventInput extends SendEmailCommon {
    blocked: boolean;
    reason?: string;
}

// send account trust status event
export interface SendAccountTrustStatusEventInput extends SendEmailCommon {
    trusted: boolean;
    reason?: string;
}

// send appointment status change for user event
export interface SendAppointmentStatusChangeForUserEventInput extends SendEmailCommon {
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
}

// send provider trial subscription event
export interface SendProviderTrialSubscriptionEventInput extends SendEmailCommon {
    startDate: string;
    endDate: string;
}

// send app connect event
export interface SendAppConnectEventInput extends SendEmailCommon {
    appConnect: AppConnect;
}

// send subscription completed event
export interface SendPlanSubscribedEventInput extends SendEmailCommon {
    subscribedPlan: string;
    startDate: string;
    endDate: string;
}

// send slot booked event
export interface SendSlotBookedEventInput extends SendEmailCommon {
    appointmentDate: string;
    appointmentMode: string;
    appointmentStatus: string;
}

// send booking payment success event
export interface SendBookingPaymentSuccessEventInput extends SendEmailCommon {
    totalAmount: number,
    paymentDate: string,
    paymentStatus: string,
    receiptUrl: string,
    transactionId: string,
    paymentFor: string,
}

// send got an appointment event
export interface SendGotAnAppointmentEventInput extends SendEmailCommon {
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: string;
}


// Added till this 

// send user payment event
export interface SendUserPaymentEventInput extends SendEmailCommon {
    amount: number;
    transactionId: string;
    paymentDate: string;
    appointmentDate: string;
    paymentStatus: PaymentStatus;
    paymentFor: PaymentFor;
}

// send provider payment event
export interface SendProviderPaymentEventInput extends SendEmailCommon {
    totalAmount: number;
    transactionId: string;
    paymentDate: string;
    paymentStatus: PaymentStatus;
    paymentFor: PaymentFor;
    receiptUrl: string;
};

// send provider payout event
export interface SendProviderPayoutEventInput extends SendEmailCommon {
    amount: number;
    transactionId: string;
    payoutDate: string;
}

// create google calendar event
export interface CreateGoogleCalendarEventInput {
    bookingId: string;
    role: Role;
    accessToken: string;
    appointmentDate: Date;
    appointmentStatus: AppointmentStatus;
    slotDuration: number
}

// update google calendar event
export interface UpdateGoogleCalendarEventInput {
    accessToken: string;
    eventId: string;
    appointmentDate: Date;
    appointmentStatus: AppointmentStatus;
    bookingId: string;
    role: Role;
}










// **** publishing events

// create google calendar event success result
export interface CreateGoogleCalendarSuccessEvent {
    mbsData: {
        bookingId: string;
        role: Role;
        eventId: string;
    }
}

// create google calendar event failed result
export interface CreateGoogleCalendarEventFailedResult {
    mbsData: {
        bookingId: string;
        role: Role;
    }
}