export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface SendOtpEmail {
  email: string;
  otp: string;
}

export interface SendEmailCommon {
  email: string;
  name: string;
}

export interface NotificationEventHandler<T = any> {
  handle(payload: T): Promise<void>;
}

export type AnyNotificationHandler = {
  handle(payload: unknown): Promise<void>;
};