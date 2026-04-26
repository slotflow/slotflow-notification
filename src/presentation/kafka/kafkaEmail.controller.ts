import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { emailHandlers, processEventWrapperUseCase } from ".";
import { kafkaEmailConsumer } from "../../infrastructure/messaging";
import { NSSubKafkaEventPayload } from "../../application/dtos/kafka.dtos";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";

class KafkaEmailController {

  constructor(
    private readonly kafkaEmailConsumerAdapter: IKafkaConsumerAdapter,
    private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase
  ) {
    this.startListening = this.startListening.bind(this);
  };

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka email controller");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.email)) {
        const useCase = emailHandlers[key as keyof typeof emailHandlers];
        if (!useCase) continue;

        await this.kafkaEmailConsumerAdapter.subscribe(topic, async ({ message }) => {
          if (!message.value) return;
          const eventData = JSON.parse(message.value.toString());
          await this.processEventWrapperUseCase.execute({
            businessUseCase: useCase,
            eventData,
            topic,
            payloadExtractor: (payload: NSSubKafkaEventPayload) => payload.emailData
          });
        });
      };

      await this.kafkaEmailConsumerAdapter.startConsumer();
    } catch (error) {
      log.error("email controller startListening failed : ", error as Error);
    };
  };
};

export const kafkaEmailController = new KafkaEmailController(
  kafkaEmailConsumer,
  processEventWrapperUseCase
);