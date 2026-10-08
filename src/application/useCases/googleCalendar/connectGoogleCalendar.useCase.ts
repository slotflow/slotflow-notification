import { kafkaConfig } from "../../../config/env";
import { IdType } from "../../../shared/utils/types/enums";
import { toAppError } from "../../../shared/error/handleUnknownError";
import { generateId } from "../../../shared/utils/helpers/generateId";
import { Credential } from "../../../domain/entities/credential.entity";
import { AppConnect, NotificationType } from "../../../domain/enums/enum";
import { notificationTemplateConstants } from "../../../shared/utils/constants/notificationConstants";
import { IAesEncryptionService } from "../../interfaces/security/IAesEncryption.service";
import { IKafkaProducerAdapter } from "../../interfaces/messaging/IKafkaProducer.adapter";
import { EventEnvelope, SendAppointmentStatusChangeForUserEvent } from "../../dtos/kafka.dto";
import { ICredentialRepository } from "../../../domain/interfaces/repositories/ICredentialRepository";
import { ConnectGoogleCalendarInput, ConnectGoogleCalendarOutput } from "../../dtos/googleCalendar.dto";

export class ConnectGoogleCalendarUseCase {
    constructor(
        private readonly aesEncryptionService: IAesEncryptionService,
        private readonly credentialRepository: ICredentialRepository,
        private readonly kafkaProducer: IKafkaProducerAdapter
    ) { }

    async execute(input: ConnectGoogleCalendarInput): Promise<ConnectGoogleCalendarOutput> {
        try {
            const { expiryDate,
                googleAccessToken,
                googleId,
                googleRefreshToken,
                userId
            } = input;

            let credential = await this.credentialRepository.findByUserId(userId);

            if (!credential) {
                const newCredentialEntity = Credential.create({ userId });
                credential = await this.credentialRepository.create(newCredentialEntity);
            }

            if (!credential) {
                return {
                    googleCalendarConnected: false,
                };
            }

            const [encryptedAccessToken, encryptedRefreshToken] = await Promise.all([
                this.aesEncryptionService.encrypt(googleAccessToken),
                this.aesEncryptionService.encrypt(googleRefreshToken),
            ]);

            credential.updateGoogleCredentials({
                googleId,
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                expiryDate,
            });

            await this.credentialRepository.update(credential);

            await this.kafkaProducer.publish<EventEnvelope<SendAppointmentStatusChangeForUserEvent>>(kafkaConfig.topics.pub.appConnect, {
                eventId: generateId(IdType.EVENT),
                attempt: 1,
                maxAttempts: 2,
                occurredAt: new Date(),
                payload: {
                    emailData: {
                        appConnect: AppConnect.GOOGLE_CALENDAR
                    },
                    notificationData: {
                        userId: userId,
                        appConnect: AppConnect.GOOGLE_CALENDAR,
                        templateKey: notificationTemplateConstants.appConnect,
                        notificationType: NotificationType.ACCOUNT_ACTIVITY
                    }
                }
            });

            return {
                googleCalendarConnected: true
            };
        } catch (error: unknown) {
            throw toAppError(error, "Failed to connect google calendar");
        }
    }
}