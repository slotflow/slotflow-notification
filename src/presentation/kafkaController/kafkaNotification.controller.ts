import { notificationHandler } from ".";
import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { kafkaNotificationConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";

class KafkaNotificationController {

    constructor(
        private readonly kafkaNotificationConsumerAdapter: IKafkaConsumerAdapter
    ) { };

    async startListening(): Promise<void> {
        try {
            log.info("start listening kafka notification controller");

            for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.notification)) {
                const useCase = notificationHandler[key as keyof typeof notificationHandler];
                if (!useCase) continue;

                await this.kafkaNotificationConsumerAdapter.subscribe(topic, async ({ message }) => {
                    if (!message.value) return;
                    const { payload: { notificationData } } = JSON.parse(message.value.toString());
                    await useCase.execute(notificationData);
                });
            };

            await this.kafkaNotificationConsumerAdapter.startConsumer();
        } catch (error) {
            log.error("notification controller startListening failed : ", error as Error);
        };
    };
};

export const kafkaNotificationController = new KafkaNotificationController(kafkaNotificationConsumer);