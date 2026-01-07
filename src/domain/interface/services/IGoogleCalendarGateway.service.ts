import { CreateGoogleCalendarEventRequest, UpdateGoogleCalendarEventRequest } from "../../../application/dtos/common";

export interface IGoogleCalendarGatewayService {

    createEvent(payload: CreateGoogleCalendarEventRequest): Promise<string>;

    updateEvent(payload: UpdateGoogleCalendarEventRequest): Promise<string>;

};
