import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { callbackConfig, serviceConfig } from "../../../config/env";
import { sendResponse } from "../../../shared/utils/helpers/response";
import { connectGoogleCalendarUseCase, getGoogleCalendarUseCase } from "..";
import { connectGoogleCalendarSchema } from "../../../shared/zod/googleCalendar";
import { AuthUser, GoogleOAuthTokens } from "../../../application/dtos/common.dto";
import { GetGoogleCalendarUseCase } from "../../../application/useCases/googleCalendar/getGoogleCalendar.useCase";
import { ConnectGoogleCalendarUseCase } from "../../../application/useCases/googleCalendar/connectGoogleCalendar.useCase";

class GoogleController {
  constructor(
    private readonly getGoogleCalendarUseCase: GetGoogleCalendarUseCase,
    private readonly connectGoogleCalendarUseCase: ConnectGoogleCalendarUseCase,
  ) {
    this.getUserEvents = this.getUserEvents.bind(this);
    this.connectGoogle = this.connectGoogle.bind(this);
  }

  async getUserEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const result = await this.getGoogleCalendarUseCase.execute({ userId: user.id });
      sendResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  async connectGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthUser;
      const state = JSON.stringify({ userId: user.id });
      passport.authenticate("google", {
        scope: [
          "profile",
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/calendar.events",
        ],
        accessType: "offline",
        prompt: "consent",
        includeGrantedScopes: true,
        session: false,
        state: state,
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate(
        "google",
        { session: false },
        async (err, data: GoogleOAuthTokens, _info) => {
          const fallbackRoute = callbackConfig.integrationsUrl;
          if (err || !data) {
            const errorPayload = {
              success: false,
              error: "GOOGLE_AUTH_FAILED",
            };

            const redirectData = encodeURIComponent(JSON.stringify(errorPayload));
            return res.redirect(
              `${serviceConfig.frontendUrl}${fallbackRoute}?response=${redirectData}`,
            );
          }

          const validatedData = connectGoogleCalendarSchema.parse(data);

          const { googleCalendarConnected } =
            await this.connectGoogleCalendarUseCase.execute(validatedData);

          const successPayload = {
            success: true,
            googleCalendarConnected,
          };

          const redirectData = JSON.stringify(successPayload);
          return res.redirect(
            `${serviceConfig.frontendUrl}${fallbackRoute}?response=${encodeURIComponent(redirectData)}`,
          );
        },
      )(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export const googleController = new GoogleController(
  getGoogleCalendarUseCase,
  connectGoogleCalendarUseCase,
);
