import { log } from "../../../../shared/logger/logger";
import { UpdateGoogleCalendarEventInput } from "../../../dtos/kafka.dtos";
import { IKafkaProducerAdapter } from "../../../../domain/interfaces/messaging/IKafkaProducerAdapter";
import { IGoogleCalendarGatewayService } from "../../../../domain/interfaces/services/IGoogleCalendarGateway.service";

export class UpdateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
        private kafkaProducer: IKafkaProducerAdapter,
    ) { };

    async execute(input: UpdateGoogleCalendarEventInput): Promise<void> {
        try {
            const {
                accessToken,
                appointmentDate,
                appointmentStatus,
                bookingId,
                eventId: calendarEventId,
                role
            } = input;

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