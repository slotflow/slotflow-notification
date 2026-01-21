import { notificationHandler } from ".";
import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/message/IKafkaConsumerAdapter";


export class KafkaNotificationController {

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
                      const payload = JSON.parse(message.value.toString());
                      await useCase.execute(payload);
                    });
                  };
            
                  await this.kafkaNotificationConsumerAdapter.startConsumer();
        } catch (error) {
            log.error("notification controller startListening failed : ", error as Error);
        };
    };
};