import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { notificationHandler, processEventWrapperUseCase } from ".";
import { EventEnvelope, NSSubKafkaEventPayload } from "../../application/dtos/kafka.dto";
import {
  NotificationEventPayload,
  NotificationTemplateKey,
} from "../../application/dtos/notification.dto";
import { kafkaNotificationConsumer } from "../../infrastructure/messaging";
import { notificationTemplateRegistry } from "../../shared/utils/constants/notificationConstants";
import { IKafkaConsumerAdapter } from "../../application/interfaces/messaging/IKafkaConsumer.adapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";

const isNotificationTemplateKey = (key: string): key is NotificationTemplateKey =>
  Object.prototype.hasOwnProperty.call(notificationTemplateRegistry, key);

class KafkaNotificationController {
  constructor(
    private readonly kafkaNotificationConsumerAdapter: IKafkaConsumerAdapter,
    private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase,
  ) {
    this.startListening = this.startListening.bind(this);
  }

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka notification controller");

      for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.notification)) {
        if (!isNotificationTemplateKey(key)) {
          log.error(`No notification template is registered for Kafka event key: ${key}`);
          continue;
        }

        const useCase = notificationHandler[key];
        if (!useCase) continue;

        await this.kafkaNotificationConsumerAdapter.subscribe(
          topic as string,
          async ({ message }) => {
            if (!message.value) return;
            const eventData = JSON.parse(message.value.toString()) as EventEnvelope<
              NSSubKafkaEventPayload<NotificationEventPayload>
            >;
            await this.processEventWrapperUseCase.execute<
              NotificationEventPayload,
              NotificationEventPayload
            >({
              businessUseCase: useCase,
              eventData,
              topic,
              payloadExtractor: (payload) => {
                return payload.notificationData?.templateKey === key
                  ? payload.notificationData
                  : undefined;
              },
            });
          },
        );
      }

      await this.kafkaNotificationConsumerAdapter.startConsumer();
    } catch (error) {
      log.error("notification controller startListening failed : ", { error });
    }
  }
}

export const kafkaNotificationController = new KafkaNotificationController(
  kafkaNotificationConsumer,
  processEventWrapperUseCase,
);
