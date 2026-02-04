import { z } from "zod";
import { objectIdRegex } from "../utils/regex";

export const validateUserIdZodSchema = z.object({
    userId: z.string().regex(objectIdRegex, "Invalid userId"),
});

export const paginationZodSchema = z.object({
    page: z.coerce.number().min(1, "Page must be at least 1").max(100, "Page must be at most 100").optional().default(1),
    limit: z.coerce.number().min(1, "Limit must be at least 1").max(100, "Limit must be at most 100").optional().default(10),
});