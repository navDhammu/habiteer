import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import habitsRouter from './api/habits/habits.routes';
import authRouter from './api/auth/auth.routes';

const app = express();

export const sessions: {
   [key: string]: { userId: number; name: string | null; email: string };
} = {};

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', (req, res, next) => {
   const session = sessions[req.cookies?.session_id];
   if (!session) return res.sendStatus(401);
   req.user = {
      id: session.userId,
      email: session.email,
   };
   next();
});

app.use('/auth', authRouter);
app.use('/api/habits', habitsRouter);

app.listen(3000, () => console.log('listening'));
