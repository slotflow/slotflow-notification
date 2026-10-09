import { z } from "zod";

export const updateNotificationPreferenceZodSchema = z.object({
  pushNotification: z.boolean(),
});

export const updatePushNotificationPreferenceZodSchema = z.object({
  pushNotification: z.boolean(),
});
