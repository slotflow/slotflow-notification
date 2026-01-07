import { OtpPurpose, Role } from "../../domain/enums/enum";
import { AdminVerificationStatus, AppointmentStatus } from "../../domain/enums/enum";

export interface ParticipantPresence {
  joined: boolean;
  joinedTime: Date | null;
  leftCallTime: Date | null;
}

export interface statusTrack {
  appointmentStatus: AppointmentStatus;
  time: Date;
}

export interface BookingDTO {
  _id: string,
  serviceProviderId: string,
  userId: string,
  appointmentDate: Date,
  appointmentTime: string,
  appointmentMode: string,
  appointmentStatus: AppointmentStatus,
  slotId: string,
  paymentId: string | null,
  videoCallRoomId: string | null,
  googleEventId: string | null,
  onlineTrack: {
    user: ParticipantPresence;
    provider: ParticipantPresence;
  },
  statusTrack: statusTrack[],
  createdAt: Date,
  updatedAt: Date,
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface SendEmailCommon {
  email: string;
  name: string;
}

// send otp event for registration and password update
export interface SendOtpEvent extends SendEmailCommon {
  otp: string;
  purpose: OtpPurpose;
}

// send welcome event
export interface SendWelcomeEvent extends SendEmailCommon {
  role: Role;
}

// send admin provider review event
export interface SendAdminProviderReviewEvent extends SendEmailCommon {
  status: AdminVerificationStatus;
  reason?: string;
}

// send account block status event
export interface SendAccountBlockStatusEvent extends SendEmailCommon {
  blocked: boolean;
  reason?: string;
}

// send account trust status event
export interface SendAccountTrustStatusEvent extends SendEmailCommon {
  trusted: boolean;
  reason?: string;
}

export interface SendProviderGotAppointmentEvent extends SendEmailCommon {
  appointmentDate: string;
  appointmentTime: string;
  appointmentDuration: string;
  appointmentMode: string;
}

export interface NotificationEventHandler<T = any> {
  handle(payload: T): Promise<void>;
}

export type AnyNotificationHandler = {
  handle(payload: unknown): Promise<void>;
};


export interface SendProviderConfirmSubscriptionEvent extends SendEmailCommon {
  startDate: string;
  endDate: string;
  subscription: string;
  duration: number;
}

export interface SendUserPaymentEmail extends SendEmailCommon {
  amount: number;
  transactionId: string;
  paymentDate: string;
  appointmentDate: string;
}


// Google calendar event
export interface UpdateGoogleCalendarEventRequest {
  eventId: string,
  appointmentDate: string,
  appointmentStatus: AppointmentStatus,
  accessToken: string,
}

export interface CreateGoogleCalendarEventRequest {
  appointmentDate: string,
  appointmentStatus: AppointmentStatus,
  slotDuration: number,
  accessToken: string;
}

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

export type AddEventToCalendarProps = Pick<GoogleCalendarEvent, "summary" | "description" | "extendedProperties"> & GoogleCalendarEventsPropsForBackend;

export interface DecodedUser {
  userOrProviderId?: string;
  role?: Role;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleId?: string;
  email?: string;
  name?: string;
  image: string | null;
  connectOnly?: boolean;
  exp?: number;
  iat?: number;
  userId: string;
};