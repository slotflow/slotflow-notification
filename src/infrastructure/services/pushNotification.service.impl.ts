import { log } from "../../shared/logger/logger";
import { firebaseMessaging } from "../firebase/firebaseAdmin";
import { IPushNotificationService, SendPushNotificationRequest } from "../../domain/interfaces/services/IPushNotification.service";

export class PushNotificationServiceImpl implements IPushNotificationService {

    async sendNotification(payload: SendPushNotificationRequest): Promise<void> {
        try {
            const { tokens, title, body, data } = payload;

            if (!tokens.length) return;

            await firebaseMessaging.sendEachForMulticast({
                tokens,
                notification: {
                    title,
                    body,
                },
                data,
            });

        } catch (error) {
            log.error("sendNotification failed : ", error as Error);
        };
    };

};