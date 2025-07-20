import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoute from './routes/health.route';
import authRoute from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoute);

app.use('/api', healthRoute);

export default app;
