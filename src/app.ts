import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(helmet());

export default app;