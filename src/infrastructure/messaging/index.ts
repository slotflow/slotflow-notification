import { kafkaClient } from "./kafka.client";
import { kafkaConfig } from "../../config/env";
import { KafkaConsumerAdapter } from "./kafkaConsumerAdapter";
import { KafkaProducerAdapter } from "./kafkaproducerAdapter";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";
import { IKafkaProducerAdapter } from "../../domain/interfaces/messaging/IKafkaProducerAdapter";

// Different Consumers for different usecases
export const kafkaEmailConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.emailGroupId
);

export const kafkaNotificationConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.notificationGroupId
);

export const kafkaGoogleCalendarConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.calendarGroupId
);

// Kafka Single producer
export const kafkaProducer: IKafkaProducerAdapter = new KafkaProducerAdapter(
  kafkaClient
);

