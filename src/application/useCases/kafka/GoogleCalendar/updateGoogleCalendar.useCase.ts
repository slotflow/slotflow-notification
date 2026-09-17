import { log } from "../../../../shared/logger/logger";
import { UpdateGoogleCalendarEventInput } from "../../../dtos/kafka.dtos";
import { IGoogleCalendarGatewayService } from "../../../../domain/interfaces/services/IGoogleCalendarGateway.service";

// TODO implement: Updating the calendar only when resheduling is happens
export class UpdateGoogleCalendarEventUseCase {
    constructor(
        private googleCalendarGatewayService: IGoogleCalendarGatewayService,
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

            await this.googleCalendarGatewayService.updateEvent({
                accessToken,
                eventId: calendarEventId,
                appointmentDate,
                appointmentStatus,
            });

            return;
        } catch (error) {
            log.error("UpdateGoogleCalendarEventUseCase failed : ", error as Error);
        };
    };
};