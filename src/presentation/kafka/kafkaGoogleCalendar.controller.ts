import { kafkaConfig } from "../../config/env";
import { log } from "../../shared/logger/logger";
import { calendarHandler, processEventWrapperUseCase } from ".";
import {
  CreateGoogleCalendarEventInput,
  UpdateGoogleCalendarEventInput,
} from "../../application/dtos/googleCalendar.dto";
import { EventEnvelope, NSSubKafkaEventPayload } from "../../application/dtos/kafka.dto";
import { kafkaGoogleCalendarConsumer } from "../../infrastructure/messaging";
import { IKafkaConsumerAdapter } from "../../application/interfaces/messaging/IKafkaConsumer.adapter";
import { ProcessEventWrapperUseCase } from "../../application/useCases/kafka/processEventWrapper.useCase";

class KafkaGoogleCalendarController {
  constructor(
    private readonly kafkaGoogleCalendarConsumerAdapter: IKafkaConsumerAdapter,
    private readonly processEventWrapperUseCase: ProcessEventWrapperUseCase,
  ) {
    this.startListening = this.startListening.bind(this);
  }

  async startListening(): Promise<void> {
    try {
      log.info("start listening kafka google calendar controller");

      const createTopic = kafkaConfig.topics.sub.calendar.createGoogleCalendarEvent;
      await this.kafkaGoogleCalendarConsumerAdapter.subscribe(createTopic, async ({ message }) => {
        if (!message.value) return;
        const eventData = JSON.parse(message.value.toString()) as EventEnvelope<
          NSSubKafkaEventPayload<CreateGoogleCalendarEventInput>
        >;
        await this.processEventWrapperUseCase.execute<
          CreateGoogleCalendarEventInput,
          CreateGoogleCalendarEventInput
        >({
          businessUseCase: calendarHandler.createGoogleCalendarEvent,
          eventData,
          topic: createTopic,
          payloadExtractor: (payload) => payload.calendarData,
        });
      });

      const updateTopic = kafkaConfig.topics.sub.calendar.updateGoogleCalendarEvent;
      await this.kafkaGoogleCalendarConsumerAdapter.subscribe(updateTopic, async ({ message }) => {
        if (!message.value) return;
        const eventData = JSON.parse(message.value.toString()) as EventEnvelope<
          NSSubKafkaEventPayload<UpdateGoogleCalendarEventInput>
        >;
        await this.processEventWrapperUseCase.execute<
          UpdateGoogleCalendarEventInput,
          UpdateGoogleCalendarEventInput
        >({
          businessUseCase: calendarHandler.updateGoogleCalendarEvent,
          eventData,
          topic: updateTopic,
          payloadExtractor: (payload) => payload.calendarData,
        });
      });

      await this.kafkaGoogleCalendarConsumerAdapter.startConsumer();
    } catch (error) {
      log.error("google calendar controller startListening failed : ", { error });
    }
  }
}

export const kafkaGoogleCalendarController = new KafkaGoogleCalendarController(
  kafkaGoogleCalendarConsumer,
  processEventWrapperUseCase,
);
