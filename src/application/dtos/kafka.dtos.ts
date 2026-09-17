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

// kafka client adapter message handler
export type MessageHandler = (payload: KafkaClientAdapterProps) => Promise<void>;


// **** KAFKA EVENTS PAYLOAD

// **** subscribing events




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
export interface GoogleCalendarCreateEventSuccessEvent {
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