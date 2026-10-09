import { log } from "../../../shared/logger/logger";
import { EventStatus } from "../../../domain/enums/enum";
import { appConfig, kafkaConfig } from "../../../config/env";
import { ProcessedEvent } from "../../../domain/entities/ProcessedEvent.entity";
import { IKafkaProducerAdapter } from "../../interfaces/messaging/IKafkaProducer.adapter";
import { IProcessedEventRepository } from "../../../domain/interfaces/repositories/IProcessedEvent.repository";
import {
  DqMetaData,
  EventEnvelope,
  NSSubKafkaEventPayload,
  ProcessEventWrapperInput,
} from "../../dtos/kafka.dto";

export class ProcessEventWrapperUseCase {
  constructor(
    private processedEventRepository: IProcessedEventRepository,
    private kafkaProducer: IKafkaProducerAdapter,
  ) {}

  private isDuplicateKeyError = (error: unknown): boolean => {
    return Boolean(
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: number }).code === 11000,
    );
  };

  async execute<TPayloadData, TBusinessData = TPayloadData>(
    input: ProcessEventWrapperInput<TPayloadData, TBusinessData>,
  ): Promise<void> {
    const { businessUseCase, eventData, topic, payloadExtractor } = input;

    const { eventId, attempt, maxAttempts, payload } = eventData;

    const payloadData = payloadExtractor(payload);

    let processedEvent = await this.processedEventRepository.findByEventId(eventId);

    if (processedEvent) {
      const props = processedEvent.getProps();

      if (props.status === EventStatus.SUCCESS) {
        log.info(`Idempotency Event ${eventId} already processed successfully. Skipping.`);
        return;
      }

      if (props.status === EventStatus.PENDING) {
        log.info(
          `Idempotency Event ${eventId} is currently PENDING. Proceeding with retry attempt ${attempt}.`,
        );
      }
    } else {
      const newProcessedEvent = ProcessedEvent.create({
        eventId,
        topic,
        status: EventStatus.PENDING,
        retryCount: attempt - 1,
        maxRetry: maxAttempts,
        payload: JSON.stringify(eventData),
        processedAt: new Date(),
      });

      try {
        processedEvent = await this.processedEventRepository.create(newProcessedEvent);
      } catch (error) {
        if (this.isDuplicateKeyError(error)) {
          log.warn(
            `Idempotency Event ${eventId} already exists in Mongo. Skipping duplicate processing.`,
          );
          return;
        }

        throw error;
      }
    }

    if (!payloadData) {
      log.error(`Kafka Invalid payloadData for event ${eventId}`);
      if (processedEvent) {
        processedEvent.markAsFailed();
        await this.processedEventRepository.update(processedEvent);
      }
      return;
    }

    try {
      await businessUseCase.execute(payloadData);
      if (processedEvent) {
        processedEvent.markAsSuccess();
        await this.processedEventRepository.update(processedEvent);
      }
    } catch (error) {
      log.error(`Kafka Event ${eventId} failed on attempt ${attempt}.`, { error });
      if (processedEvent) {
        processedEvent.markAsFailed();
        await this.processedEventRepository.update(processedEvent);
      }

      if (attempt < maxAttempts) {
        log.info(
          `Kafka Retrying event ${eventId}. Publishing attempt ${attempt + 1}/${maxAttempts}`,
        );
        await this.kafkaProducer.publish(topic, {
          ...eventData,
          attempt: attempt + 1,
          occurredAt: new Date(),
        });
      } else {
        log.error(
          `Kafka Event ${eventId} exhausted all ${maxAttempts} attempts. Moving to DLQ (or dropping).`,
        );

        await this.kafkaProducer.publish<
          EventEnvelope<NSSubKafkaEventPayload<TPayloadData>, DqMetaData>
        >(kafkaConfig.topics.dlqTopic, {
          ...eventData,
          metadata: {
            service: appConfig.serviceName,
            originalTopic: topic,
            error: (error as Error).message,
            failedAt: new Date(),
            retryCount: attempt,
          },
        });
      }
    }
  }
}
