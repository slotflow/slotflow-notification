import { Router } from 'express';
import userDeviceRouter from '../http/userDevice/userDevice.router';
import notificationRouter from '../http/notification/notification.router';

const router = Router();

router.use('/notifications', notificationRouter);
router.use('/user-devices', userDeviceRouter);

export default router;