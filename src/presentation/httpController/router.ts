import { Router } from "express";
import { userDeviceController } from "./userDevice.controller";
import { notificationController } from "./notification.controller";

const router = Router();

router.post('/register-device',userDeviceController.registerDevice);

router.get('/notifications',notificationController.getNotifications);

export default router;