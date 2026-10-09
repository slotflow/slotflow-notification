import { kafkaConfig } from "../../../../config/env";
import { log } from "../../../../shared/logger/logger";
import { EventEnvelope } from "../../../dtos/kafka.dto";
import { IdType } from "../../../../shared/utils/types/enums";
import { NotFoundError } from "../../../../shared/error/appError";
import { generateId } from "../../../../shared/utils/helpers/generateId";
import { IGoogleTokenService } from "../../../interfaces/services/IGoogleToken.service";
import { IKafkaProducerAdapter } from "../../../interfaces/messaging/IKafkaProducer.adapter";
import { IGoogleCalendarService } from "../../../interfaces/services/IGoogleCalendarGateway.service";
import {
  CreateGoogleCalendarEventInput,
  GoogleCalendarCreateEventFailedEvent,
  GoogleCalendarCreateEventSuccessEvent,
} from "../../../dtos/googleCalendar.dto";

export class CreateGoogleCalendarEventUseCase {
  constructor(
    private readonly googleCalendarService: IGoogleCalendarService,
    private readonly kafkaProducer: IKafkaProducerAdapter,
    private readonly googleTokenService: IGoogleTokenService,
  ) {}

  async execute(input: CreateGoogleCalendarEventInput): Promise<void> {
    try {
      const { role, userId, appointmentDate, appointmentStatus, bookingId, slotDuration } = input;

      if (!userId || !role || !appointmentDate || !appointmentStatus || !bookingId) {
        return;
      }

      let accessToken: string | null = null;

      try {
        accessToken = await this.googleTokenService.getAccessToken(userId);
      } catch (error) {
        if (error instanceof NotFoundError) {
          log.warn(
            `CreateGoogleCalendarEventUseCase skipped calendar sync for user ${userId}: Google credentials not found.`,
          );
          return;
        }

        throw error;
      }

      if (!accessToken) {
        await this.kafkaProducer.publish<EventEnvelope<GoogleCalendarCreateEventFailedEvent>>(
          kafkaConfig.topics.pub.googleCalendarCreateEventFailed,
          {
            eventId: generateId(IdType.EVENT),
            occurredAt: new Date(),
            attempt: 1,
            maxAttempts: 3,
            payload: {
              mbsData: {
                bookingId,
                role,
              },
            },
          },
        );
        return;
      }

      const calendarEventId = await this.googleCalendarService.createEvent({
        accessToken,
        appointmentDate: new Date(appointmentDate),
        appointmentStatus: appointmentStatus,
        slotDuration,
      });

      // TODO create and send notification

      if (calendarEventId) {
        await this.kafkaProducer.publish<EventEnvelope<GoogleCalendarCreateEventSuccessEvent>>(
          kafkaConfig.topics.pub.googleCalendarCreateEventSuccess,
          {
            eventId: generateId(IdType.EVENT),
            occurredAt: new Date(),
            attempt: 1,
            maxAttempts: 3,
            payload: {
              mbsData: {
                bookingId,
                role,
                eventId: calendarEventId,
              },
            },
          },
        );
        return;
      } else {
        await this.kafkaProducer.publish<EventEnvelope<GoogleCalendarCreateEventFailedEvent>>(
          kafkaConfig.topics.pub.googleCalendarCreateEventFailed,
          {
            eventId: generateId(IdType.EVENT),
            occurredAt: new Date(),
            attempt: 1,
            maxAttempts: 3,
            payload: {
              mbsData: {
                bookingId,
                role,
              },
            },
          },
        );
      }
      return;
    } catch (error) {
      log.error("CreateGoogleCalendarEventUseCase failed : ", { error });
    }
  }
}
