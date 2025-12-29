import { log } from "../../shared/logger/logger";
import { AnyNotificationHandler } from "../dtos/common";
import { KafkaClientAdapter } from "../../infrastructure/messaging/kafkaClientAdapter";

export class ListenNotificationEventsUseCase {
  constructor(
    private kafkaClientAdapter: KafkaClientAdapter,
    private topicHandlers: Map<string, AnyNotificationHandler>
  ) { }

  async execute(): Promise<void> {
    for (const [topic, handler] of this.topicHandlers.entries()) {
      await this.kafkaClientAdapter.subscribe(topic, async ({ message }) => {
        if (!message.value) return;

        try {
          const payload = JSON.parse(message.value.toString());
          await handler.handle(payload);
        } catch (error) {
          log.error(`Notification handling failed for topic ${topic}`, error as Error);
        }
      });
    }
  }
}
