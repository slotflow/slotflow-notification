import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { emailHandlers, processEventWrapperUseCase } from ".";
import { kafkaEmailConsumer } from "../../infrastructure/messaging";
import { EmailEventPayload } from "../../application/dtos/email.dto";
import { EventEnvelope, NSSubKafkaEventPayload } from "../../application/dtos/kafka.dto";
import { IKafkaConsumerAdapter } from "../../application/interfaces/messaging/IKafkaConsumer.adapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";

const isEmailHandlerKey = (key: string): key is keyof typeof emailHandlers =>
  Object.prototype.hasOwnProperty.call(emailHandlers, key);

class KafkaEmailController {
  constructor(
    private readonly kafkaEmailConsumerAdapter: IKafkaConsumerAdapter,
    private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase,
  ) {
    this.startListening = this.startListening.bind(this);
  }

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka email controller");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.email)) {
        if (!isEmailHandlerKey(key)) continue;

        const useCase = emailHandlers[key];
        if (!useCase) continue;

        await this.kafkaEmailConsumerAdapter.subscribe(topic, async ({ message }) => {
          if (!message.value) return;
          const eventData = JSON.parse(message.value.toString()) as EventEnvelope<
            NSSubKafkaEventPayload<EmailEventPayload>
          >;
          await this.processEventWrapperUseCase.execute<EmailEventPayload, EmailEventPayload>({
            businessUseCase: useCase,
            eventData,
            topic,
            payloadExtractor: (payload) =>
              payload.emailData?.templateKey === key ? payload.emailData : undefined,
          });
        });
      }

      await this.kafkaEmailConsumerAdapter.startConsumer();
    } catch (error) {
      log.error("email controller startListening failed : ", { error });
    }
  }
}

export const kafkaEmailController = new KafkaEmailController(
  kafkaEmailConsumer,
  processEventWrapperUseCase,
);
