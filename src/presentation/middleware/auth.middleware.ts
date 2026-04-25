import { Role } from "../../domain/enums/enum";
import { log } from "../../shared/logger/logger";
import { NextFunction, Request, Response } from "express";
import { DecodedUser } from "../../application/dtos/common.dtos";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];

    const normalizedUserId = Array.isArray(userId) ? userId[0] : userId;
    const normalizedRole = Array.isArray(role)
      ? (role[0] as Role)
      : (role as Role);

    req.user = {
      id: normalizedUserId,
      role: normalizedRole,
    } as DecodedUser;

    next();
  } catch (error) {
    log.error("error", error as Error);
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token." });
    return;
  };
};