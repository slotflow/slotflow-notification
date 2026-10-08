import { log } from "../../../shared/logger/logger";
import { BadRequestError, NotFoundError } from "../../../shared/error/appError";
import { NotificationPreference } from "../../../domain/entities/notificationPreference.entity";
import { INotificationPreferenceRepository } from "../../../domain/interfaces/repositories/INotificationPreference.repository";
import { GetMyNotificationPreferenceInput, GetMyNotificationPreferenceOutput } from "../../dtos/notificationPreference.tdto";

export class GetMyNotificationPreferenceUseCase {
    constructor(
        private readonly notificationPreferenceRepository: INotificationPreferenceRepository,
    ) { };

    async execute(input: GetMyNotificationPreferenceInput): Promise<GetMyNotificationPreferenceOutput> {
        try {
            const { userId } = input;
            if (!userId) {
                throw new BadRequestError();
            }

            const notificationPreference = await this.notificationPreferenceRepository.findByUserId(userId)
                ?? await this.notificationPreferenceRepository.create(NotificationPreference.create({ userId }));

            if (!notificationPreference) {
                throw new NotFoundError();
            }

            return {
                accountActivity: notificationPreference.accountActivity,
                systemUpdates: notificationPreference.systemUpdates,
                promotionalUpdates: notificationPreference.promotionalUpdates,
            };
        } catch (error) {
            log.error("GetMyNotificationPreferenceUseCase failed :", error as Error);
            throw error;
        };
    };
};
