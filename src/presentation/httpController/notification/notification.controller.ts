import { getNotificationsUseCase } from "..";
import { log } from "../../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response";
import { DecodedUser } from "../../../application/dtos/common.dtos";
import { paginationZodSchema } from "../../../shared/zod/common.zod";
import { GetNotificationsUseCase } from "../../../application/useCases/notification/getNotifications.useCase";

export class NotificationController {
    constructor(
        private readonly getNotificationsUseCase: GetNotificationsUseCase
    ) {
        this.getNotifications = this.getNotifications.bind(this);
    };

    async getNotifications(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user as DecodedUser;
            const validatedData = paginationZodSchema.parse({
                page: req.query.page,
                limit: req.query.limit
            });
            const result = await this.getNotificationsUseCase.execute({...validatedData, userId: user.userOrProviderId});
            sendResponse(res, result);
        } catch (error) {
            log.error("getNotifications failed :", error as Error);
            next(error);
        };
    };

};

export const notificationController = new NotificationController(
    getNotificationsUseCase
);