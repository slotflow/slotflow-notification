import { KafkaMessage } from "kafkajs";
import { AppConnect } from "../../domain/enums/enum";
import { CommonNotificationEventInput } from "./notification.dto";

/**
 * Kafka common dtos
 */

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


/**
 * Kafka publishing events
 */

export interface SendAppointmentStatusChangeForUserEvent {
    emailData: {
        appConnect: AppConnect;
    },
    notificationData: CommonNotificationEventInput & {
        appConnect: AppConnect;
    }
}