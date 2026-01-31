import { kafkaConfig } from "../../../config/env";
import { log } from "../../../shared/logger/logger";
import { IKafkaProducerAdapter } from "../../../domain/interfaces/message/IKafkaProducerAdapter";
import { IGoogleCalendarGatewayService } from "../../../domain/interfaces/services/IGoogleCalendarGateway.service";
import { CreateGoogleCalendarEvent, CreateGoogleCalendarEventFailedResult, CreateGoogleCalendarEventSuccessResult, EventEnvelope, UpdateGoogleCalendarEvent } from "../../dtos/kafka.dtos";

export class CreateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(envelopePayload: EventEnvelope<CreateGoogleCalendarEvent>): Promise<void> {
        try {
            const {
                attempt,
                maxAttempts,
                payload: {
                    role,
                    accessToken,
                    appointmentDate,
                    appointmentStatus,
                    bookingId,
                }
            } = envelopePayload;

            if (!accessToken || !role || !appointmentDate || !appointmentStatus || !bookingId) {
                return;
            };

            const eventId = await this.googleCalendarGatewayService.createEvent({
                accessToken,
                appointmentDate: new Date(appointmentDate),
                appointmentStatus: appointmentStatus,
            });

            if (eventId && (attempt <= maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEventSuccessResult>>(
                    kafkaConfig.topics.pub.googleCalendarSuccess,
                    {
                        ...envelopePayload,
                        payload: {
                            bookingId,
                            role,
                            eventId,
                        }
                    }
                );
                return;
            };

            if (!eventId && (attempt < maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEvent>>(
                    kafkaConfig.topics.pub.googleCalendarFailed,
                    {
                        ...envelopePayload,
                        occurredAt: new Date(),
                    }
                );
            };

            if(!eventId && (attempt > maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEventFailedResult>>(
                    kafkaConfig.topics.pub.googleCalendarFailed,
                    {
                        ...envelopePayload,
                        payload: {
                            bookingId,
                            role,
                            error: "Failed to create google calendar event",
                        }
                    }
                );
            }

            return;
        } catch (error) {
            log.error("CreateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};

export class UpdateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(payload: UpdateGoogleCalendarEvent): Promise<void> {
        try {
            const { accessToken, appointmentDate, appointmentStatus, bookingId, eventId, role } = payload;

            const updatedEventId = await this.googleCalendarGatewayService.updateEvent({
                accessToken,
                eventId,
                appointmentDate,
                appointmentStatus,
            });

            // if (updatedEventId) {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarSuccess, {
            //         eventId,
            //         bookingId,
            //         role
            //     });
            // } else {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarFailed, {
            //         eventId,
            //         bookingId,
            //         role
            //     });
            // };

            return;
        } catch (error) {
            log.error("UpdateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};