import express from 'express';
import { Pool } from 'pg';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';
import habitsRouter from './api/habits/routes';
import authRouter from './api/auth/routes';

config();
const app = express();

export const pool = new Pool({
   connectionString: process.env.DB_URL,
   max: 5,
});

export const sessions: {
   [key: string]: { userId: number; name: string | null; email: string };
} = {};

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', (req, res, next) => {
   if (!sessions[req.cookies?.session_id]) {
      return res.sendStatus(401);
   }
   next();
});

app.use('/auth', authRouter);
app.use('/api/habits', habitsRouter);

app.listen(3000, () => console.log('listening'));
