import passport from "passport";
import { Request } from "express";
import { googleClientConfig } from "../../config/env";
import { GoogleOAuthTokens } from "../../application/dtos/common.dto";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { IGooglePassportStrategy } from "../../application/interfaces/passport/IGooglePassport.stratergy";

export class GooglePassportStrategyImpl implements IGooglePassportStrategy {

  constructor(
  ) { };

  register(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: googleClientConfig.googleClientId!,
          clientSecret: googleClientConfig.googleClientSecret!,
          callbackURL: googleClientConfig.googleCallbackUrl,
          passReqToCallback: true,
        },
        async (
          req: Request,
          accessToken: string,
          refreshToken: string,
          params: { expires_in: number },
          profile: Profile,
          done: VerifyCallback
        ) => {
          try {
            let userId = "";
            if (req.query?.state && typeof req.query.state === "string") {
              const parsedState = JSON.parse(req.query.state);
              userId = parsedState.userId || "";
            }

            const expiresInSeconds = params.expires_in || 3600;
            const expiryDate = new Date(Date.now() + expiresInSeconds * 1000);

            const tokenPayload: GoogleOAuthTokens = {
              userId,
              googleId: profile.id,
              googleAccessToken: accessToken,
              googleRefreshToken: refreshToken,
              expiryDate,
            };

            return done(null, tokenPayload);
          } catch (err) {
            return done(err);
          };
        },
      ),
    );
  };
};
