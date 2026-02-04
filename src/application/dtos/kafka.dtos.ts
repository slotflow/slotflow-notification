import { KafkaMessage } from "kafkajs";
import { AdminVerificationStatus, AppConnect, AppointmentStatus, OtpPurpose, PaymentFor, PaymentGateway, PaymentStatus, Role } from "../../domain/enums/enum";

// **** COMMON DTOS

// kafka client adapter props
export interface KafkaClientAdapterProps {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

// event envelope
export interface EventEnvelope<T> {
    eventId: string;
    occurredAt: Date;
    attempt: number;
    maxAttempts: number;
    payload: T;
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

// send admin provider review event
export interface SendAdminProviderReviewEvent extends SendEmailCommon {
    status: AdminVerificationStatus;
    reason?: string;
}

// send account block status event
export interface SendAccountBlockStatusEvent extends SendEmailCommon {
    blocked: boolean;
    reason?: string;
}

// send account trust status event
export interface SendAccountTrustStatusEvent extends SendEmailCommon {
    trusted: boolean;
    reason?: string;
}

// send appointment status change for user event
export interface SendAppointmentStatusChangeForUserEvent extends SendEmailCommon {
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
}

// send provider trial subscription event
export interface SendProviderTrialSubscriptionEvent extends SendEmailCommon {
    startDate: string;
    endDate: string;
}

// send app connect event
export interface SendAppConnectEvent extends SendEmailCommon {
    appConnect: AppConnect;
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
export type SendProviderPaymentEvent = SendEmailCommon & SendNotificationCommon & {
    totalAmount: number;
    transactionId: string;
    paymentDate: string;
    subscriptionStartDate: string;
    subscriptionEndDate: string;
    paymentStatus: PaymentStatus;
    paymentFor: PaymentFor;
};

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
    calendarData: {
        bookingId: string;
        role: Role;
        accessToken: string;
        appointmentDate: Date;
        appointmentStatus: AppointmentStatus;
        slotDuration: number
    }
}

// create google calendar event success result
export interface CreateGoogleCalendarEventSuccessResult {
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
        error: string;
    }
}

// update google calendar event
export interface UpdateGoogleCalendarEvent {
    calendarData: {
        accessToken: string;
        eventId: string;
        appointmentDate: Date;
        appointmentStatus: AppointmentStatus;
        bookingId: string;
        role: Role;
    }
}