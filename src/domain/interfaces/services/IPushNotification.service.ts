export interface SendPushNotificationRequest {
  tokens: string[],
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface IPushNotificationService {

    sendNotification(payload: SendPushNotificationRequest): Promise<void>;

};