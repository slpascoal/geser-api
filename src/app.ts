import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoute from './routes/health.route';
import authRoutes from './routes/auth.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoute);
app.use('/api/auth', authRoutes);

export default app;
