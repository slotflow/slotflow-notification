import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { userDeviceController } from "../userDevice/userDevice.controller";

const router = Router();
console.log("user device router");

router.post('/', authMiddleware, userDeviceController.registerDevice);

export default router;