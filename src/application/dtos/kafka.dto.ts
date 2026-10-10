import { KafkaMessage } from "kafkajs";
import { AppConnect } from "../../domain/enums/enum";
import { NotificationEventPayload, SendAppConnectNotificationEventInput } from "./notification.dto";
import { EmailEventPayload } from "./email.dto";

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
export interface NSSubKafkaEventPayload<TData = Record<string, string | number>> {
  emailData?: EmailEventPayload;
  notificationData?: NotificationEventPayload;
  calendarData?: TData;
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
export interface ProcessEventWrapperInput<TPayloadData, TBusinessData = TPayloadData> {
  topic: string;
  eventData: EventEnvelope<NSSubKafkaEventPayload<TPayloadData>>;
  businessUseCase: { execute: (data: TBusinessData) => Promise<void> };
  payloadExtractor: (payload: NSSubKafkaEventPayload<TPayloadData>) => TBusinessData | undefined;
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
  };
  notificationData: SendAppConnectNotificationEventInput;
}
