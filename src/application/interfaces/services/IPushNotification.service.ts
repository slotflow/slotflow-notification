import { SendPushNotificationRequest } from "../../dtos/notification.dto";

export interface IPushNotificationService {

    sendNotification(payload: SendPushNotificationRequest): Promise<void>;

};