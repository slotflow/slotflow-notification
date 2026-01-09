import { handlers } from ".";
import { kafkaConfig } from "../config/env";
import { log } from "../shared/logger/logger";
import { IKafkaClientAdapter } from "../domain/interface/message/IKafkaClientAdapter";

export class KafkaConsumerController {

  constructor(
    private kafkaClientAdapter: IKafkaClientAdapter
  ) { };

  async startListening(): Promise<void> {
    try {
      log.info("start listening");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub)) {
        const useCase = handlers[key as keyof typeof handlers];
        if (!useCase) continue;

        await this.kafkaClientAdapter.subscribe(topic, async ({ message }) => {
          if (!message.value) return;
          const payload = JSON.parse(message.value.toString());
          await useCase.handle(payload);
        });
      };

      await this.kafkaClientAdapter.startConsumer();
    } catch (error) {
      log.error("startListening failed : ", error as Error);
    };
  };
};