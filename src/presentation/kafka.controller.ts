import { handlers } from ".";
import { kafkaConfig } from "../config/env";
import { log } from "../shared/logger/logger";
import { KafkaClientAdapter } from "../infrastructure/messaging/kafkaClientAdapter";

export class KafkaConsumerController {

  constructor(
    private kafkaClient: KafkaClientAdapter
  ) { };

  async startListening(): Promise<void> {
    try {
      log.info("start listening");

      for (const [key, topic] of Object.entries(kafkaConfig.topics)) {
        const useCase = handlers[key as keyof typeof handlers];
        if (!useCase) continue;

        await this.kafkaClient.subscribe(topic, async ({ message }) => {
          if (!message.value) return;
          const payload = JSON.parse(message.value.toString());
          await useCase.handle(payload);
        });
      };

      await this.kafkaClient.startConsumer();
    } catch (error) {
      log.error("startListening failed : ", error as Error);
    };
  };
};