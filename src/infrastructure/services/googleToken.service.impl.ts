import { log } from "../../shared/logger/logger";
import { ERROR_CODES } from "../../shared/utils/types/enums";
import { AppError, NotFoundError, UnauthorizedError } from "../../shared/error/appError";
import { IGoogleTokenService } from "../../application/interfaces/services/IGoogleToken.service";
import { ICredentialRepository } from "../../domain/interfaces/repositories/ICredentialRepository";
import { IAesEncryptionService } from "../../application/interfaces/security/IAesEncryption.service";
import { IGoogleRefreshTokenService } from "../../application/interfaces/services/IGoogleRefreshToken.service";

export class GoogleTokenServiceImpl implements IGoogleTokenService {
    constructor(
        private credentialRepository: ICredentialRepository,
        private aesEncryption: IAesEncryptionService,
        private googleRefreshTokenService: IGoogleRefreshTokenService
    ) { };

    async getAccessToken(userId: string): Promise<string> {
        try {
            if (!userId) {
                throw new UnauthorizedError(
                    "User ID is required",
                    ERROR_CODES.UNAUTHORIZED
                );
            }

            const credentials = await this.credentialRepository.findByUserId(userId);

            if (!credentials || !credentials.google) {
                log.warn(`GoogleTokenServiceImpl: Google credentials not found for user ${userId}. Calendar sync is optional and may be skipped.`);
                throw new NotFoundError(
                    "Google credentials not found",
                    ERROR_CODES.CREDENTIAL_NOT_FOUND
                );
            }

            const isExpired = credentials.isGoogleTokenExpired();
            if (!isExpired && credentials.google.accessToken) {
                return await this.aesEncryption.decrypt(credentials.google.accessToken);
            }

            if (!credentials.google.refreshToken) {
                throw new UnauthorizedError(
                    "Refresh token missing",
                    ERROR_CODES.TOKEN_MISSING
                );
            }

            const decryptedRefreshToken = await this.aesEncryption.decrypt(
                credentials.google.refreshToken
            );

            const refreshed = await this.googleRefreshTokenService.refreshAccessToken(
                decryptedRefreshToken
            );

            const encryptedAccessToken = await this.aesEncryption.encrypt(
                refreshed.accessToken
            );

            const encryptedRefreshToken = refreshed.refreshToken
                ? await this.aesEncryption.encrypt(refreshed.refreshToken)
                : credentials.google.refreshToken;

            credentials.updateGoogleCredentials({
                accessToken: encryptedAccessToken,
                refreshToken: encryptedRefreshToken,
                googleId: credentials.google.googleId,
                lastSyncedAt: new Date(),
                expiryDate: new Date(Date.now() + refreshed.expiresIn * 1000),
            });

            await this.credentialRepository.update(credentials);

            return refreshed.accessToken;
        } catch (error) {
            log.error("GoogleTokenService failed", error as Error);
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                "Unable to get access token",
                500,
                false,
                ERROR_CODES.INTERNAL_ERROR
            );
        }
    };
};

