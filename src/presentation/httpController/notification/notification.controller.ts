import { getAllNotificationsUseCase } from "..";
import { log } from "../../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response";
import { DecodedUser } from "../../../application/dtos/common.dtos";
import { getAllNotificationsZodSchema } from "../../../shared/zod/notification.zod";
import { IGetAllNotificationsUseCase } from "../../../application/dtos/useCase.dtos";

export class NotificationController {
    constructor(
        private readonly getAllNotificationsUseCase: IGetAllNotificationsUseCase
    ) {
        this.getNotifications = this.getNotifications.bind(this);
    };


    async getNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req.user as DecodedUser);
            const validatedData = getAllNotificationsZodSchema.parse({
                userId: user.userOrProviderId,
                page: req.query.page,
                limit: req.query.limit
            });
            const result = await this.getAllNotificationsUseCase.execute(validatedData);
            sendResponse(res, result);
        } catch (error) {
            log.error("getNotifications failed :", error as Error);
            next(error);
        };
    };

};

export const notificationController = new NotificationController(
    getAllNotificationsUseCase
);