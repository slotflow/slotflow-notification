import { ERROR_CODES } from "../../../shared/utils/types/enums";
import { toAppError } from "../../../shared/error/handleUnknownError";
import { BadRequestError, NotFoundError } from "../../../shared/error/appError";
import { IAesEncryptionService } from "../../interfaces/security/IAesEncryption.service";
import { ICredentialRepository } from "../../../domain/interfaces/repositories/ICredentialRepository";
import { IGoogleCalendarService } from "../../interfaces/services/IGoogleCalendarGateway.service";
import { GetEventsFromCalendarProps, GetGoogleCalendarInput, GetGoogleCalendarOutput } from "../../dtos/googleCalendar.dto";

export class GetGoogleCalendarUseCase {
    constructor(
        private readonly credentialRepository: ICredentialRepository,
        private readonly aesEncryption: IAesEncryptionService,
        private readonly googleCalendarService: IGoogleCalendarService
    ) { };

    async execute(input: GetGoogleCalendarInput): Promise<GetGoogleCalendarOutput> {
        try {
            const { userId } = input;
            if (!userId) {
                throw new BadRequestError()
            }

            const credential = await this.credentialRepository.findByUserId(userId);
            if (!credential) {
                throw new NotFoundError(
                    "Invalid or expired access token",
                    ERROR_CODES.INVALID_CREDENTIALS
                );
            };
            if (!credential?.google?.accessToken) {
                return [];
            }

            const accessToken = await this.aesEncryption.decrypt(credential.google.accessToken);

            const events = await this.googleCalendarService.findEvents(accessToken);

            const normalizedEvents: GetEventsFromCalendarProps[] = events.map((event) => {
                const start = typeof event.start === 'object' ? (event.start.dateTime || event.start.date || "") : (event.start || "");
                const end = typeof event.end === 'object' ? (event.end.dateTime || event.end.date || "") : (event.end || "");

                return {
                    id: event.id,
                    summary: event.summary,
                    title: event.summary,
                    start,
                    end,
                    description: event.description,
                    creator: event.creator,
                    organizer: event.organizer,
                    iCalUID: event.iCalUID,
                    reminders: event.reminders,
                    eventType: event.eventType,
                    ...event.extendedProperties?.private,
                };
            });

            return normalizedEvents;
        } catch (error: unknown) {
            throw toAppError(error, "Failed to get google calendar");
        };
    };
};