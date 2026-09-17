import { kafkaConfig } from "../../../../config/env";
import { log } from "../../../../shared/logger/logger";
import { IdType } from "../../../../shared/utils/types/enums";
import { generateId } from "../../../../shared/utils/helpers/generateId";
import { IKafkaProducerAdapter } from "../../../../domain/interfaces/messaging/IKafkaProducerAdapter";
import { IGoogleCalendarGatewayService } from "../../../../domain/interfaces/services/IGoogleCalendarGateway.service";
import { CreateGoogleCalendarEventInput, CreateGoogleCalendarEventFailedResult, GoogleCalendarCreateEventSuccessEvent, EventEnvelope } from "../../../dtos/kafka.dtos";

export class CreateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(input: CreateGoogleCalendarEventInput): Promise<void> {
        try {
            const {
                role,
                accessToken,
                appointmentDate,
                appointmentStatus,
                bookingId,
                slotDuration
            } = input;

            if (!accessToken || !role || !appointmentDate || !appointmentStatus || !bookingId) {
                return;
            };

            const calendarEventId = await this.googleCalendarGatewayService.createEvent({
                accessToken,
                appointmentDate: new Date(appointmentDate),
                appointmentStatus: appointmentStatus,
                slotDuration
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
                            }
                        }
                    }
                );
                return;
            } else {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEventFailedResult>>(
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
                            }
                        }
                    }
                );
            };
            return;
        } catch (error) {
            log.error("CreateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};