import { log } from "../../../shared/logger/logger";
import { INotificationRepository } from "../../../domain/interfaces/repositories/INotification.repository";
import { GetNotificationsRequest, TableData, GetNotificationsResponse } from "../../dtos/common.dtos";

export class GetNotificationsUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) { };

    async execute(payload: GetNotificationsRequest): Promise<TableData<GetNotificationsResponse>> {
        try {
            const { limit, page, userId } = payload;

            const result = await this.notificationRepository.findAll(userId, page, limit);
            const { data: notifications, currentPage, totalCount, totalPages } = result;

            return {
                data: notifications.map(notification => ({
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