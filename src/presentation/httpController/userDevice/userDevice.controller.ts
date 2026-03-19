import { registerDeviceUseCase } from "..";
import { log } from "../../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response";
import { DecodedUser } from "../../../application/dtos/common.dtos";
import { registerDeviceZodSchema } from "../../../shared/zod/notification.zod";
import { RegisterDeviceUseCase } from "../../../application/useCases/userDevice/registerDevice.useCase";

export class UserDeviceController {
    constructor(
        private readonly registerDeviceUseCase: RegisterDeviceUseCase,
    ) {
        this.registerDevice = this.registerDevice.bind(this);
    };

    async registerDevice(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("user device controller");
            const user = (req.user as DecodedUser);
            const validatedData = registerDeviceZodSchema.parse({
                ...req.body,
            });
            console.log("validatedData : ",validatedData);
            await this.registerDeviceUseCase.execute({...validatedData, userId: user.userOrProviderId});
            sendResponse(res, null);
        } catch (error) {
            log.error("registerDevice failed : ", error as Error);
            next(error)
        };
    };

};

export const userDeviceController = new UserDeviceController(
    registerDeviceUseCase,
);