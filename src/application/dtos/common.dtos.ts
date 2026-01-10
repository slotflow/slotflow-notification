import { AppConnect, OtpPurpose, PaymentFor, PaymentStatus, Role } from "../../domain/enums/enum";
import { AdminVerificationStatus, AppointmentStatus } from "../../domain/enums/enum";

// participant presence
export interface ParticipantPresence {
  joined: boolean;
  joinedTime: Date | null;
  leftCallTime: Date | null;
}

// status track
export interface statusTrack {
  appointmentStatus: AppointmentStatus;
  time: Date;
}

// booking dto
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

// email options
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// send email common
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

// send provider got appointment event
export interface SendGotAppointmentEvent extends SendEmailCommon {
  appointmentDate: string;
  appointmentTime: string;
  appointmentDuration: string;
  appointmentMode: string;
}

// send appointment status change event
export interface SendAppointmentStatusChangeEvent extends SendEmailCommon {
  appointmentDate: string;
  appointmentTime: string;
  appointmentMode: string;
  appointmentStatus: AppointmentStatus;
}

// send user payment event
export interface SendUserPaymentEvent extends SendEmailCommon {
  amount: number;
  transactionId: string;
  paymentDate: string;
  appointmentDate: string;
  paymentStatus: PaymentStatus;
  paymentFor: PaymentFor;
}

// send provider payment event
export interface SendProviderPaymentEvent extends SendEmailCommon {
  amount: number;
  transactionId: string;
  paymentDate: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  paymentStatus: PaymentStatus;
  paymentFor: PaymentFor;
}

// send provider payout event
export interface SendProviderPayoutEvent extends SendEmailCommon {
  amount: number;
  transactionId: string;
  payoutDate: string;
}

// send app connect event
export interface SendAppConnectEvent extends SendEmailCommon {
  appConnect: AppConnect;
}

// send provider trial subscription event
export interface SendProviderTrialSubscriptionEvent extends SendEmailCommon {
  startDate: string;
  endDate: string;
}

// create google calendar event
export interface CreateGoogleCalendarEvent {
  accessToken: string;
  appointmentDate: string;
  appointmentStatus: AppointmentStatus;
  slotDuration: number;
  bookingId: string;
}

// google calendar event response
export interface GoogleCalendarEventResponse {
  eventId: string;
  bookingId: string;
}

// update google calendar event
export interface UpdateGoogleCalendarEvent {
  accessToken: string;
  eventId: string;
  appointmentDate: string;
  appointmentStatus: AppointmentStatus;
  bookingId: string;
}

// kafka client adapter props
export interface KafkaClientAdapterProps<T> {
  topic: string;
  partition: number;
  message: T;
}

// kafka client adapter message handler
export type MessageHandler<T = any> = (payload: KafkaClientAdapterProps<T>) => Promise<void>;


// Google calendar event
export interface UpdateGoogleCalendarEventRequest {
  eventId: string,
  appointmentDate: string,
  appointmentStatus: AppointmentStatus,
  accessToken: string,
}

// create google calendar event request
export interface CreateGoogleCalendarEventRequest {
  appointmentDate: string,
  appointmentStatus: AppointmentStatus,
  slotDuration: number,
  accessToken: string;
}

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

// add event to calendar props
export type AddEventToCalendarProps = Pick<GoogleCalendarEvent, "summary" | "description" | "extendedProperties"> & GoogleCalendarEventsPropsForBackend;

// decoded user
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