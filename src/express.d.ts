import { AuthUser } from "./application/dtos/common.dtos";

// Extend the Request interface
declare global {
    namespace Express {
        interface User extends AuthUser { }
        interface Request {
            user: User;
        }
    }
}

