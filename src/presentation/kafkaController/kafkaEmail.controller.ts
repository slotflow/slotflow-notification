import { emailHandlers } from ".";
import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { kafkaEmailConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";

class KafkaEmailController {

  constructor(
    private readonly kafkaEmailConsumerAdapter: IKafkaConsumerAdapter
  ) { };

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka email controller");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.email)) {
        const useCase = emailHandlers[key as keyof typeof emailHandlers];
        if (!useCase) continue;

        await this.kafkaEmailConsumerAdapter.subscribe(topic, async ({ message }) => {
          if (!message.value) return;
          const { payload: { emailData } } = JSON.parse(message.value.toString());
          await useCase.execute(emailData);
        });
      };

      await this.kafkaEmailConsumerAdapter.startConsumer();
    } catch (error) {
      log.error("email controller startListening failed : ", error as Error);
    };
  };
};

export const kafkaEmailController = new KafkaEmailController(kafkaEmailConsumer);