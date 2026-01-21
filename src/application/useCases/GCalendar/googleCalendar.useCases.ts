// import { kafkaConfig } from "../../config/env";
import { log } from "../../../shared/logger/logger";
import { CreateGoogleCalendarEvent, UpdateGoogleCalendarEvent } from "../../dtos/kafka.dtos";
// import { IKafkaProducerAdapter } from "../../domain/interfaces/message/IKafkaProducerAdapter";
import { IGoogleCalendarGatewayService } from "../../../domain/interfaces/services/IGoogleCalendarGateway.service";


export class CreateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        // private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(payload: CreateGoogleCalendarEvent): Promise<void> {
        try {
            const { accessToken, appointmentDate, appointmentStatus, slotDuration, bookingId } = payload;

            const eventId = await this.googleCalendarGatewayService.createEvent({
                accessToken,
                appointmentDate,
                appointmentStatus,
                slotDuration: Number(slotDuration),
            });

            // if (eventId) {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarCreateSuccess, {
            //         eventId,
            //         bookingId,
            //     });
            // } else {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarCreateFailed, {
            //         eventId,
            //         bookingId,
            //     });
            // };

            return;
        } catch (error) {
            log.error("CreateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};

export class UpdateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        // private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(payload: UpdateGoogleCalendarEvent): Promise<void> {
        try {
            const { accessToken, appointmentDate, appointmentStatus, bookingId, eventId } = payload;

            const updatedEventId = await this.googleCalendarGatewayService.updateEvent({
                accessToken,
                eventId,
                appointmentDate,
                appointmentStatus,
            });

            // if (updatedEventId) {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarUpdateSuccess, {
            //         eventId,
            //         bookingId
            //     });
            // } else {
            //     await this.kafkaProducer.publish<GoogleCalendarEventResponse>(kafkaConfig.topics.pub.googleCalendarUpdateFailed, {
            //         eventId,
            //         bookingId
            //     });
            // };
            return;
        } catch (error) {
            log.error("UpdateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};