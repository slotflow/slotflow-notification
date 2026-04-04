import helmet from 'helmet';
import express from 'express';
import v1router from '../presentation/router/router.v1';
import { errorHandler } from '../presentation/middleware/error.middleware';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1router);

app.use(errorHandler);

export default app;