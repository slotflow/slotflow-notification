import { kafkaClient } from "./kafka.client";
import { kafkaConfig } from "../../config/env";
import { KafkaConsumerAdapter } from "./kafkaConsumer.adapter.impl";
import { KafkaProducerAdapter } from "./kafkaproducer.adapter.impl";
import { IKafkaConsumerAdapter } from "../../application/interfaces/messaging/IKafkaConsumer.adapter";
import { IKafkaProducerAdapter } from "../../application/interfaces/messaging/IKafkaProducer.adapter";

// Different Consumers for different usecases
export const kafkaEmailConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.emailGroupId,
);

export const kafkaNotificationConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.notificationGroupId,
);

export const kafkaGoogleCalendarConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.calendarGroupId,
);

// Kafka Single producer
export const kafkaProducer: IKafkaProducerAdapter = new KafkaProducerAdapter(kafkaClient);
