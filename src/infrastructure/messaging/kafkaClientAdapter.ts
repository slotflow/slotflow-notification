import { log } from "../../shared/logger/logger";
import { Kafka, Consumer, Producer, logLevel } from "kafkajs";

export type MessageHandler = (payload: {
  topic: string;
  partition: number;
  message: any;
}) => Promise<void>;

export class KafkaClientAdapter {
  private kafka: Kafka;
  private consumer!: Consumer;
  private producer!: Producer;
  private handlers = new Map<string, MessageHandler>();

  constructor(
    clientId: string,
    private groupId: string,
    brokers: string[]
  ) {
    this.kafka = new Kafka({
      clientId,
      brokers,
      logLevel: logLevel.ERROR,
    });
  }


  async connectConsumer(): Promise<void> {
    this.consumer = this.kafka.consumer({ groupId: this.groupId });
    await this.consumer.connect();
    log.info(`Kafka consumer connected [group=${this.groupId}]`);
  }

  async subscribe(topic: string, handler: MessageHandler): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: false });
    this.handlers.set(topic, handler);
    log.info(`Subscribed to topic: ${topic}`);
  }

  async startConsumer(): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const handler = this.handlers.get(topic);
        if (!handler) return;
        await handler({ topic, partition, message });
      },
    });

    log.info("Kafka consumer running");
  }


  async connectProducer(): Promise<void> {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    log.info("Kafka producer connected");
  }

  async publish(topic: string, payload: unknown): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }

  getProducer(): Producer {
    if (!this.producer) {
      throw new Error("Producer not connected");
    }
    return this.producer;
  }
}
