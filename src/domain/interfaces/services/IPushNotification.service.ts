import { SendPushNotificationRequest } from "../../../application/dtos/common.dtos";

export interface IPushNotificationService {

    sendNotification(payload: SendPushNotificationRequest): Promise<void>;

};