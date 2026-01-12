import { kafkaClient } from "../lib/kafka";
import { kafkaConfig } from "../../config/env";
import { KafkaConsumerAdapter } from "./kafkaConsumerAdapter";
import { KafkaProducerAdapter } from "./kafkaproducerAdapter";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/message/IKafkaConsumerAdapter";
import { IKafkaProducerAdapter } from "../../domain/interfaces/message/IKafkaProducerAdapter";

// Different Consumers for different usecases
export const kafkaEmailConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.emailGroupId
);

export const kafkaPushNotificationConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.pushGroupId
);

export const kafkaInappNotificationConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.inappGroupId
);

export const kafkaGoogleCalendarConsumer: IKafkaConsumerAdapter = new KafkaConsumerAdapter(
  kafkaClient,
  kafkaConfig.groups.calendarGroupId
);

// Kafka Single producer
export const kafkaProducer: IKafkaProducerAdapter = new KafkaProducerAdapter(
  kafkaClient
);

