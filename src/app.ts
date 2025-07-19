import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoute from './routes/health.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoute); // rota: /api/health

export default app;
