import { z } from "zod";
import { Platform } from "../../domain/enums/enum";
import { paginationZodSchema, validateUserIdZodSchema } from "./common.zod";

export const registerDeviceZodSchema = z.object({
    fcmToken: z
        .string()
        .min(50, "FCM token is too short")
        .max(4096, "FCM token is too long"),

    deviceId: z
        .string()
        .min(10, "Device ID must be at least 10 characters")
        .max(255, "Device ID must be at most 255 characters"),

    platform: z.nativeEnum(Platform, {
        errorMap: () => ({ message: "Invalid platform" }),
    }),
});