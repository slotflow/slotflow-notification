import { calendarHandler } from ".";
import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { kafkaGoogleCalendarConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../domain/interfaces/messaging/IKafkaConsumerAdapter";

class KafkaGoogleCalendarController {

    constructor(
        private readonly kafkaGoogleCalendarConsumerAdapter: IKafkaConsumerAdapter
    ) { };

    async startListening(): Promise<void> {
        try {
            log.info("start listening kafka google calendar controller");

            for (const [key, topic] of Object.entries(kafkaConfig.topics.sub.calendar)) {
                const useCase = calendarHandler[key as keyof typeof calendarHandler];
                if (!useCase) continue;

                await this.kafkaGoogleCalendarConsumerAdapter.subscribe(topic, async ({ message }) => {
                    if (!message.value) return;
                    const eventData = JSON.parse(message.value.toString());
                    await useCase.execute(eventData);
                });
            };

            await this.kafkaGoogleCalendarConsumerAdapter.startConsumer();
        } catch (error) {
            log.error("google calendar controller startListening failed : ", error as Error);
        };
    };
};

export const kafkaGoogleCalendarController = new KafkaGoogleCalendarController(kafkaGoogleCalendarConsumer);