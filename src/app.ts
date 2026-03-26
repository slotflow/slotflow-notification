import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import v1router from './presentation/router/router.v1';
import { errorHandler } from './presentation/middleware/error.middleware';

dotenv.config();

const app = express();

// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics({ register: client.register });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1router);

// app.get('/metrics', async (req, res) => {
//     res.setHeader('Content-Type', client.register.contentType);
//     const metrics = await client.register.metrics();
//     res.send(metrics);
// })

app.use(errorHandler);

export default app;