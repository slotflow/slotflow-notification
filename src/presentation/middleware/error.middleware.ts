import { ZodError } from "zod";
import { AppError } from "../../shared/dtos/common";
import { NextFunction, Request, Response } from "express";
import { isNamedError } from "../../shared/utils/isNamedError";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        console.error("Zod Validation Error:", JSON.stringify(err.issues, null, 2));
        return res.status(400).json({ 
            success: false, 
            message: "Validation failed", 
            errors: err.issues 
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    if (isNamedError(err)) {
        if (err.name === "UnauthorizedError") {
            return res.status(401).json({ success: false, message: "Unauthorized access." });
        }
        if (err.name === "ForbiddenError") {
            return res.status(403).json({ success: false, message: "Forbidden action." });
        }
    }

    console.error("UNEXPECTED ERROR:", err);
    
    const message = err instanceof Error ? err.message : "Internal Server Error";
    
    res.status(500).json({
        success: false,
        message: message,
    });
};

