import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { userDeviceController } from "./userDevice.controller";

const router = Router();
console.log("user device router");

router.post('/', authMiddleware, userDeviceController.registerDevice);

export default router;