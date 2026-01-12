import { MessageHandler } from "../../../application/dtos/common.dtos";

export interface IKafkaConsumerAdapter {

  connectConsumer(): Promise<void>;

  subscribe(topic: string, handler: MessageHandler): Promise<void>;

  startConsumer(): Promise<void>;

};
