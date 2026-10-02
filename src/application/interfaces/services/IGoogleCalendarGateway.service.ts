import { CreateGoogleCalendarEventRequest, GetEventsFromCalendarProps, UpdateGoogleCalendarEventRequest } from "../../dtos/googleCalendar.dto";

export interface IGoogleCalendarService {

    createEvent(payload: CreateGoogleCalendarEventRequest): Promise<string>;

    updateEvent(payload: UpdateGoogleCalendarEventRequest): Promise<string>;

    findEvents(accessToken: string): Promise<Array<GetEventsFromCalendarProps>>;

};
