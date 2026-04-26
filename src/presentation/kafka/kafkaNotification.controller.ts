import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { notificationHandler, processEventWrapperUseCase } from ".";
import { NSSubKafkaEventPayload } from "../../application/dtos/kafka.dtos";
import { kafkaNotificationConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";

class KafkaNotificationController {

    constructor(
        private readonly kafkaNotificationConsumerAdapter: IKafkaConsumerAdapter,
        private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase
    ) {
        this.startListening = this.startListening.bind(this);
    };

    async startListening(): Promise<void> {
        try {
            log.info("start listening kafka notification controller");

            for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.notification)) {
                const useCase = notificationHandler[key as keyof typeof notificationHandler];
                if (!useCase) continue;

                await this.kafkaNotificationConsumerAdapter.subscribe(topic, async ({ message }) => {
                    if (!message.value) return;
                    const eventData = JSON.parse(message.value.toString());
                    await this.processEventWrapperUseCase.execute({
                        businessUseCase: useCase,
                        eventData,
                        topic,
                        payloadExtractor: (payload: NSSubKafkaEventPayload) => payload.notificationData
                    });
                });
            };

            await this.kafkaNotificationConsumerAdapter.startConsumer();
        } catch (error) {
            log.error("notification controller startListening failed : ", error as Error);
        };
    };
};

export const kafkaNotificationController = new KafkaNotificationController(
    kafkaNotificationConsumer,
    processEventWrapperUseCase
);