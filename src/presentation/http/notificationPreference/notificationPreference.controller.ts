import { log } from "../../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { AuthUser } from "../../../application/dtos/common.dto";
import { sendResponse } from "../../../shared/utils/helpers/response";
import {
  getMyNotificationPreferenceUseCase,
  updateNotificationPreferenceUseCase,
  updatePushNotificationPreferenceUseCase,
} from "..";
import { GetMyNotificationPreferenceUseCase } from "../../../application/useCases/notificationPreference/getMyNotificationPreference.useCase";
import { UpdateNotificationPreferenceUseCase } from "../../../application/useCases/notificationPreference/updateNotificationPreference.useCase";
import {
  updateNotificationPreferenceZodSchema,
  updatePushNotificationPreferenceZodSchema,
} from "../../../shared/zod/notificationPreference.zod";
import { UpdatePushNotificationPreferenceUseCase } from "../../../application/useCases/notificationPreference/updatePushNotificationPreference.useCase";

export class NotificationPreferenceController {
  constructor(
    private readonly getMyNotificationPreferenceUseCase: GetMyNotificationPreferenceUseCase,
    private readonly updateNotificationPreferenceUseCase: UpdateNotificationPreferenceUseCase,
    private readonly updatePushNotificationPreferenceUseCase: UpdatePushNotificationPreferenceUseCase,
  ) {
    this.getMyNotificationPreference = this.getMyNotificationPreference.bind(this);
    this.updateNotificationPreference = this.updateNotificationPreference.bind(this);
    this.updatePushNotificationPreference = this.updatePushNotificationPreference.bind(this);
  }

  async getMyNotificationPreference(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const result = await this.getMyNotificationPreferenceUseCase.execute({
        userId: user.id,
      });
      sendResponse(res, result);
    } catch (error) {
      log.error("getMyNotificationPreference failed :", { error });
      next(error);
    }
  }

  async updateNotificationPreference(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const validatedData = updateNotificationPreferenceZodSchema.parse(req.body);
      const result = await this.updateNotificationPreferenceUseCase.execute({
        ...validatedData,
        userId: user.id,
      });
      sendResponse(res, result);
    } catch (error) {
      log.error("updateNotificationPreference failed :", { error });
      next(error);
    }
  }

  async updatePushNotificationPreference(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const validatedData = updatePushNotificationPreferenceZodSchema.parse(req.body);
      await this.updatePushNotificationPreferenceUseCase.execute({
        ...validatedData,
        userId: user.id,
      });
      sendResponse(res, null);
    } catch (error) {
      log.error("updatePushNotificationPreference failed :", { error });
      next(error);
    }
  }
}

export const notificationPreferenceController = new NotificationPreferenceController(
  getMyNotificationPreferenceUseCase,
  updateNotificationPreferenceUseCase,
  updatePushNotificationPreferenceUseCase,
);
