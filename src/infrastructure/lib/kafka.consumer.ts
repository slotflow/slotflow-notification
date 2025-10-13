import { Kafka, Consumer } from "kafkajs";
import { kafkaConfig } from "../../config/env";

export class KafkaConsumerService {
    private consumer!: Consumer;

    constructor(
        private clientId: string,
        private groupId: string,
        private brokers: string[]
    ) { }

    async connect(): Promise<void> {
        const kafka = new Kafka({ clientId: this.clientId, brokers: this.brokers });
        this.consumer = kafka.consumer({ groupId: this.groupId });
        await this.consumer.connect();
        console.log("✅ Kafka consumer connected");
    }

    async subscribe(
        topic: string,
        eachMessage: (payload: { message: any; topic: string; partition: number }) => Promise<void>,
        fromBeginning = false
    ) {
        await this.consumer.subscribe({ topic, fromBeginning });
        await this.consumer.run({ eachMessage });
    }
}


export const kafkaConsumerService = new KafkaConsumerService(
    kafkaConfig.clientId!,
    kafkaConfig.groupId!,
    kafkaConfig.brokers
);

export const connectKafkaConsumer = async () => {
    await kafkaConsumerService.connect();
}