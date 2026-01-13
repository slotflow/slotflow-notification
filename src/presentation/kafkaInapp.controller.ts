import { log } from "../shared/logger/logger";
import { IKafkaConsumerAdapter } from "../domain/interfaces/message/IKafkaConsumerAdapter";

export class KafkaNotificationController {

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