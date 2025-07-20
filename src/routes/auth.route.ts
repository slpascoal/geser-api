import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';

const app = Router();

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

export default app;
