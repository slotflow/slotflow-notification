import { CreateGoogleCalendarEventRequest, UpdateGoogleCalendarEventRequest } from "../../../application/dtos/kafka.dtos";

export interface IGoogleCalendarGatewayService {

    createEvent(payload: CreateGoogleCalendarEventRequest): Promise<string>;

    updateEvent(payload: UpdateGoogleCalendarEventRequest): Promise<string>;

};
