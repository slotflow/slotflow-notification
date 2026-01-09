import { kafkaConfig } from "../../config/env";
import { IKafkaClientAdapter } from "../../domain/interface/message/IKafkaClientAdapter";
import { KafkaClientAdapter } from "./kafkaClientAdapter";

export const kafkaClientAdapter: IKafkaClientAdapter = new KafkaClientAdapter(
  kafkaConfig.clientId,
  kafkaConfig.groupId,
  [kafkaConfig.broker1, kafkaConfig.broker2, kafkaConfig.broker3]
);
