import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { notificationController } from "./notification.controller";

const router = Router();

router.get('/', authMiddleware, notificationController.getNotifications);

export default router;