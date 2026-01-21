import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import notificationRouter from './presentation/httpController/router';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notifications',notificationRouter);

export default app;