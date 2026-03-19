import { Platform, Role } from "../../domain/enums/enum";
import { AppointmentStatus } from "../../domain/enums/enum";

// **** ENTITY DTOS 

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


// notification dto
export interface Notification {
  _id: string;
  userId: string;
  title: string;
  body: string;
  pushNotification: boolean;
  isRead: boolean;
  data?: Record<string, string>,
  createdAt: Date;
  updatedAt: Date;
}


// **** COMMON DTOS 

// email options
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}


// decoded user
export interface DecodedUser {
  userOrProviderId: string;
  role: Role;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleId?: string;
  email?: string;
  name?: string;
  image: string | null;
  connectOnly?: boolean;
  exp?: number;
  iat?: number;
};


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
  data?: T
};


// **** USECASE DTOS

// Register Device 
export interface RegisterDeviceRequest {
  fcmToken: string;
  deviceId: string;
  platform: Platform;
  userId: string;
};


// Get All Notifications
export interface GetNotificationsRequest extends ApiPaginationRequest {
  userId: string;
};

// Get All Notifications Response
export type GetNotificationsResponse = Array<Pick<Notification, "_id" | "createdAt" | "isRead" | "title" | "body" | "data">>;

// Send Notification Request
export type SendNotificationRequest = Pick<Notification, "userId" | "body" | "data" | "pushNotification" | "title">;