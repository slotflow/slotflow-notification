import { getNotificationsUseCase } from "..";
import { log } from "../../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/helpers/response";
import { AuthUser } from "../../../application/dtos/common.dto";
import { paginationZodSchema } from "../../../shared/zod/common.zod";
import { GetNotificationsUseCase } from "../../../application/useCases/notification/getNotifications.useCase";

export class NotificationController {
  constructor(private readonly getNotificationsUseCase: GetNotificationsUseCase) {
    this.getNotifications = this.getNotifications.bind(this);
  }

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const validatedData = paginationZodSchema.parse({
        page: req.query.page,
        limit: req.query.limit,
      });
      const result = await this.getNotificationsUseCase.execute({
        ...validatedData,
        userId: user.id,
      });
      sendResponse(res, result);
    } catch (error) {
      log.error("getNotifications failed :", { error });
      next(error);
    }
  }
}

export const notificationController = new NotificationController(getNotificationsUseCase);
