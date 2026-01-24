import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { userDeviceController } from "../userDevice/userDevice.controller";

const router = Router();

router.post('/', authMiddleware, userDeviceController.registerDevice);

export default router;