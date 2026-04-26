import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { calendarHandler, processEventWrapperUseCase } from ".";
import { NSSubKafkaEventPayload } from "../../application/dtos/kafka.dtos";
import { kafkaGoogleCalendarConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/processEventWrapper.useCase";

class KafkaGoogleCalendarController {

    constructor(
        private readonly kafkaGoogleCalendarConsumerAdapter: IKafkaConsumerAdapter,
        private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase
    ) {
        this.startListening = this.startListening.bind(this);
    };

    async startListening(): Promise<void> {
        try {
            log.info("start listening kafka google calendar controller");

            for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.calendar)) {
                const useCase = calendarHandler[key as keyof typeof calendarHandler];
                if (!useCase) continue;

                await this.kafkaGoogleCalendarConsumerAdapter.subscribe(topic, async ({ message }) => {
                    if (!message.value) return;
                    const eventData = JSON.parse(message.value.toString());
                    await this.processEventWrapperUseCase.execute({
                        businessUseCase: useCase,
                        eventData,
                        topic,
                        payloadExtractor: (payload: NSSubKafkaEventPayload) => payload.calendarData
                    });
                });
            };

            await this.kafkaGoogleCalendarConsumerAdapter.startConsumer();
        } catch (error) {
            log.error("google calendar controller startListening failed : ", error as Error);
        };
    };
};

export const kafkaGoogleCalendarController = new KafkaGoogleCalendarController(
    kafkaGoogleCalendarConsumer,
    processEventWrapperUseCase
);