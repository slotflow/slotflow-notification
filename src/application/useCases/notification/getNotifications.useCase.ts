import { log } from "../../../shared/logger/logger";
import { INotificationRepository } from "../../../domain/interfaces/repositories/INotification.repository";
import { GetNotificationsInput, TableData, GetNotificationsOutput } from "../../dtos/common.dtos";

export class GetNotificationsUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) { };

    async execute(input: GetNotificationsInput): Promise<TableData<GetNotificationsOutput>> {
        try {
            const { limit, page, userId } = input;

            const result = await this.notificationRepository.findAll(userId, page, limit);
            const { items: notifications, currentPage, totalCount, totalPages } = result;

            return {
                items: notifications.map(notification => ({
                    _id: notification._id,
                    createdAt: notification.createdAt,
                    title: notification.title,
                    body: notification.body,
                    data: notification.data,
                    isRead: notification.isRead,
                })),
                currentPage,
                totalCount,
                totalPages
            };
        } catch (error) {
            log.error("GetAllNotificationsUseCase failed : ", error as Error);
            throw error;
        };
    };

};