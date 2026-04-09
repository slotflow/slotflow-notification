import { Router } from "express";
import { userDeviceController } from "./userDevice.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post('/', authMiddleware, userDeviceController.registerDevice);

export default router;