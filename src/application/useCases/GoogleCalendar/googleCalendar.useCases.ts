import { kafkaConfig } from "../../../config/env";
import { log } from "../../../shared/logger/logger";
import { IKafkaProducerAdapter } from "../../../domain/interfaces/messaging/IKafkaProducerAdapter";
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
                eventId,
                occurredAt,
                attempt,
                maxAttempts,
                payload: {
                    calendarData: {
                        role,
                        accessToken,
                        appointmentDate,
                        appointmentStatus,
                        bookingId,
                        slotDuration
                    }
                }
            } = envelopePayload;

            if (!accessToken || !role || !appointmentDate || !appointmentStatus || !bookingId) {
                return;
            };

            const calendarEventId = await this.googleCalendarGatewayService.createEvent({
                accessToken,
                appointmentDate: new Date(appointmentDate),
                appointmentStatus: appointmentStatus,
                slotDuration
            });

            if (calendarEventId && (attempt <= maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEventSuccessResult>>(
                    kafkaConfig.topics.pub.googleCalendarSuccess,
                    {
                        ...envelopePayload,
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
            };

            if (!calendarEventId && (attempt < maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEvent>>(
                    kafkaConfig.topics.pub.googleCalendarFailed,
                    {
                        ...envelopePayload,
                        occurredAt: new Date(),
                    }
                );
            };

            if (!calendarEventId && (attempt > maxAttempts)) {
                await this.kafkaProducer.publish<EventEnvelope<CreateGoogleCalendarEventFailedResult>>(
                    kafkaConfig.topics.pub.googleCalendarFailed,
                    {
                        ...envelopePayload,
                        payload: {
                            mbsData: {
                                bookingId,
                                role,
                                error: "Failed to create google calendar event",
                            }
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

    async execute(payload: EventEnvelope<UpdateGoogleCalendarEvent>): Promise<void> {
        try {
            const {
                attempt,
                eventId,
                maxAttempts,
                occurredAt,
                payload: {
                    calendarData: {
                        accessToken,
                        appointmentDate,
                        appointmentStatus,
                        bookingId,
                        eventId: calendarEventId,
                        role
                    }
                }
            } = payload;

            const updatedEventId = await this.googleCalendarGatewayService.updateEvent({
                accessToken,
                eventId: calendarEventId,
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