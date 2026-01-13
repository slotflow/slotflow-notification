import { Router } from "express";
import { notificationController } from "./notification.controller";

const router = Router();

router.post('/register-device',notificationController.registerDevice);
router.get('/notifications',notificationController.getNotifications);