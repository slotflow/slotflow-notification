import { Router } from 'express';
import userDeviceRouter from '../httpController/userDevice/userDevice.router';
import notificationRouter from '../httpController/notification/notification.router';

const router = Router();

router.use('/notifications', notificationRouter);
router.use('/user-devices', userDeviceRouter);

export default router;