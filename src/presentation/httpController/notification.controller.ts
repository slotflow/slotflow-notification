import { log } from "../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import { DecodedUser } from "../../application/dtos/common.dtos";
import { getAllNotificationsUseCase, registerDeviceUseCase } from ".";
import { registerDeviceZodSchema, getAllNotificationsZodSchema } from "../../shared/zod/notification.zod";
import { IGetAllNotificationsUseCase, IRegisterDeviceUseCase } from "../../application/dtos/useCase.dtos";

export class NotificationController {
    constructor(
        private readonly registerDeviceUseCase: IRegisterDeviceUseCase,
        private readonly getAllNotificationsUseCase: IGetAllNotificationsUseCase
    ) {
        this.registerDevice = this.registerDevice.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
    };

    async registerDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req.user as DecodedUser);
            const validatedData = registerDeviceZodSchema.parse({
                ...req.body,
                userId: user.userOrProviderId,
            })
            await this.registerDeviceUseCase.execute(validatedData);
            sendResponse(res,null);
        } catch (error) {
            log.error("registerDevice failed : ",error as Error);
            next(error)
        };
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
            sendResponse(res,result);
        } catch (error) {
            log.error("getNotifications failed :",error as Error);
            next(error);
        };
    };

};

export const notificationController = new NotificationController(
    registerDeviceUseCase,
    getAllNotificationsUseCase
);