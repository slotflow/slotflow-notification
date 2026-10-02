import { log } from "../../shared/logger/logger";
import { AppError } from "../../shared/error/appError";
import { ERROR_CODES } from "../../shared/utils/types/enums";
import { firebaseMessaging } from "../firebase/firebaseAdmin";
import { SendPushNotificationRequest } from "../../application/dtos/notification.dto";
import { IPushNotificationService } from "../../application/interfaces/services/IPushNotification.service";

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
            throw new AppError(
                "Failed to send push notification",
                500,
                false,
                ERROR_CODES.GOOGLE_API_ERROR
            );
        };
    };

};