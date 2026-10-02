import { Platform, Role } from "../../domain/enums/enum";
import { AppointmentStatus } from "../../domain/enums/enum";
import { NotificationProps } from "../../domain/contracts/notification.contract";

/**
 * Dtos from main service
 */

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





/**
 * Common dtos
 */


// decoded user
export interface AuthUser {
  id: string;
  role: Role;
  email: string;
  name: string;
  timeZone: TimeZone;
};

export interface GoogleOAuthTokens {
  userId: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  googleId: string;
  expiryDate: Date;
}


// Used as the response interface for the all request
export interface CommonResponse {
  success?: boolean;
  message?: string;
};


// Used as the request interface for the paginated request
export interface ApiPaginationRequest {
  page: number;
  limit: number;
}


// Used as the type of table data
export interface TableData<T> {
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
  items?: T
};


// **** USECASE DTOS

// Register Device 
export interface RegisterDeviceInput {
  fcmToken: string;
  deviceId: string;
  platform: Platform;
  userId: string;
};


// Get All Notifications
export interface GetNotificationsInput extends ApiPaginationRequest {
  userId: string;
};


// Get All Notifications Response
export type GetNotificationsOutput = Array<Pick<NotificationProps, "_id" | "createdAt" | "isRead" | "title" | "body" | "data">>;


// Notification channels
export type NotificationChannel = 'email' | 'push' | 'in_app';


// Provider address for the user view
export type ProviderAddressForUser = {
  addressLine: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  location: string;
  googleMapsUrl: string;
} | null;

// Time zone interface
export interface TimeZone {
    value: string;
    label: string;
    offset: number;
    abbrev: string;
    altName: string;
}