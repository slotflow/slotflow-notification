import { IKafkaConsumerAdapter } from "../domain/interfaces/message/IKafkaConsumerAdapter";
import { log } from "../shared/logger/logger";

export class KafkaGoogleCalendarController {

    constructor(
        private readonly kafkaConsumerAdapter: IKafkaConsumerAdapter
    ) { };

    async startListening(): Promise<void> {
        try {

        } catch (error) {
            log.error("startListening failed : ", error as Error);
        };
    };
};