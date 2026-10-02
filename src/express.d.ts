import { AuthUser, GoogleOAuthTokens } from "./application/dtos/common.dto";

// Extend the Request interface
declare global {
    namespace Express {
         interface User extends Partial<AuthUser>, Partial<GoogleOAuthTokens> { }
        interface Request {
            user: User;
        }
    }
}

