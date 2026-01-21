import { registerDeviceUseCase } from ".";
import { log } from "../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import { DecodedUser } from "../../application/dtos/common.dtos";
import { registerDeviceZodSchema } from "../../shared/zod/notification.zod";
import { IRegisterDeviceUseCase } from "../../application/dtos/useCase.dtos";

export class UserDeviceController {
    constructor(
        private readonly registerDeviceUseCase: IRegisterDeviceUseCase,
    ) {
        this.registerDevice = this.registerDevice.bind(this);
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

};

export const userDeviceController = new UserDeviceController(
    registerDeviceUseCase,
);