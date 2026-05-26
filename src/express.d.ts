import { DecodedUser } from "./application/dtos/common.dtos";

// Extend the Request interface
declare global {
    namespace Express {
        interface User extends DecodedUser { }
        interface Request {
            user: User;
        }
    }
}

