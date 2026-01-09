import { MessageHandler } from "../../../application/dtos/common";

export interface IKafkaClientAdapter {

  connectConsumer(): Promise<void>;

  subscribe(topic: string, handler: MessageHandler): Promise<void>;

  startConsumer(): Promise<void>;

  connectProducer(): Promise<void>;

  publish<T>(topic: string, payload: T): Promise<void>;

};
