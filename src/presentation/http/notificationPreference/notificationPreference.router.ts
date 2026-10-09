import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { notificationPreferenceController } from "./notificationPreference.controller";

const router = Router();

router.get("/", authMiddleware, notificationPreferenceController.getMyNotificationPreference);

router.patch("/", authMiddleware, notificationPreferenceController.updateNotificationPreference);

router.patch(
  "/push",
  authMiddleware,
  notificationPreferenceController.updatePushNotificationPreference,
);

export default router;
