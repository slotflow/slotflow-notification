import { AppointmentStatus } from "../../enums/enum";

export interface CreateGoogleCalendarEventRequest {
    appointmentDate: Date,
    appointmentStatus: AppointmentStatus,
    accessToken: string;
    slotDuration: number;
}

export interface UpdateGoogleCalendarEventRequest {
    eventId: string,
    appointmentDate: Date,
    appointmentStatus: AppointmentStatus,
    accessToken: string,
}

export interface IGoogleCalendarGatewayService {

    createEvent(payload: CreateGoogleCalendarEventRequest): Promise<string>;

    updateEvent(payload: UpdateGoogleCalendarEventRequest): Promise<string>;

};
