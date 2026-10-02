import { BookingDTO } from "./common.dto";
import { AppointmentStatus, Role } from "../../domain/enums/enum";

// google calendar events props for backend
interface GoogleCalendarEventsPropsForBackend {
  start: {
    dateTime: string,
    timeZone: string,
  };
  end: {
    dateTime: string,
    timeZone: string,
  };
}

// google calendar event
export interface GoogleCalendarEvent extends Partial<BookingDTO> {
  id: string;
  iCalUID?: string;
  kind?: string;
  eventType?: string;

  summary?: string;
  description?: string;

  created?: string;
  updated?: string;

  htmlLink?: string;
  status?: string;

  creator?: {
    email: string;
    self?: boolean;
  };

  organizer?: {
    email: string;
    self?: boolean;
  };

  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };

  sequence?: number;
  etag?: string;

  extendedProperties?: {
    private: {
      bookingStatus?: string;
      bookingId?: string;
      title?: string;
      backgroundColor?: string;
      textColor?: string;
    },
  },
};




/**
 * Google calnedar service dtos
 */


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

// used in add event to calendar usecase
interface CombinedStartAndEndProps {
  start: {
    dateTime: string,
    date: string,
    timeZone: string,
  } | string;
  end: {
    dateTime: string,
    date: string,
    timeZone: string,
  } | string;
}


export type GetEventsFromCalendarProps = Pick<GoogleCalendarEvent, "id" | "summary" | "description" | "creator" | "organizer" | "iCalUID" | "reminders" | "eventType" | "extendedProperties"> & CombinedStartAndEndProps;


export type AddEventToCalendarProps = Pick<GoogleCalendarEvent, "summary" | "description" | "extendedProperties"> & GoogleCalendarEventsPropsForBackend;





/**
 * Google calendat usecase dtos
 */

// GetGoogleCalendarUseCase
export interface GetGoogleCalendarInput {
  userId: string;
}
export type GetGoogleCalendarOutput = Array<GetEventsFromCalendarProps>;


// ConnectGoogleCalendarUseCase
export interface ConnectGoogleCalendarInput {
  userId: string;
  googleId: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  expiryDate: Date,
}
export interface ConnectGoogleCalendarOutput {
  googleCalendarConnected: boolean;
}




/**
 * Google calendar kafka events dtos
 */

// consuming events

// create google calendar event
export interface CreateGoogleCalendarEventInput {
  bookingId: string;
  role: Role;
  userId: string;
  appointmentDate: Date;
  appointmentStatus: AppointmentStatus;
  slotDuration: number
}

// update google calendar event
export interface UpdateGoogleCalendarEventInput {
  userId: string;
  eventId: string;
  appointmentDate: Date;
  appointmentStatus: AppointmentStatus;
  bookingId: string;
  role: Role;
}

// publishing events

// create google calendar event success result
export interface GoogleCalendarCreateEventSuccessEvent {
  mbsData: {
    bookingId: string;
    role: Role;
    eventId: string;
  }
}

// create google calendar event failed result
export interface GoogleCalendarCreateEventFailedEvent {
  mbsData: {
    bookingId: string;
    role: Role;
  }
}