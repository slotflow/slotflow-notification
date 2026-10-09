import { log } from "../../../../shared/logger/logger";
import { UpdateGoogleCalendarEventInput } from "../../../dtos/googleCalendar.dto";
import { IGoogleTokenService } from "../../../interfaces/services/IGoogleToken.service";
import { IGoogleCalendarService } from "../../../interfaces/services/IGoogleCalendarGateway.service";

// TODO implement: Updating the calendar only when resheduling is happens
export class UpdateGoogleCalendarEventUseCase {
  constructor(
    private googleCalendarService: IGoogleCalendarService,
    private readonly googleTokenService: IGoogleTokenService,
  ) {}

  async execute(input: UpdateGoogleCalendarEventInput): Promise<void> {
    try {
      const { userId, appointmentDate, appointmentStatus, eventId: calendarEventId } = input;

      const accessToken = await this.googleTokenService.getAccessToken(userId);
      if (accessToken) {
        await this.googleCalendarService.updateEvent({
          accessToken,
          eventId: calendarEventId,
          appointmentDate,
          appointmentStatus,
        });
      }

      return;
    } catch (error) {
      log.error("UpdateGoogleCalendarEventUseCase failed : ", { error });
    }
  }
}
