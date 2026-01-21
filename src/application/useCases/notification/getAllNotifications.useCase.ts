import { log } from "../../../shared/logger/logger";
import { IGetAllNotificationsUseCase } from "../../dtos/useCase.dtos";
import { INotificationRepository } from "../../../domain/interfaces/repositories/INotification.repository";
import { GetAllNotificationsRequest, TableData, GetAllNotificationsResponse } from "../../dtos/common.dtos";

export class GetAllNotificationsUseCase implements IGetAllNotificationsUseCase {
    constructor(
        private readonly notificationRepository: INotificationRepository
    ) { };

    async execute(payload: GetAllNotificationsRequest): Promise<TableData<GetAllNotificationsResponse>> {
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