import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const app = Router();

app.get('/health', healthCheck);

export default app;
