import { Router } from 'express';
import { body } from 'express-validator';
import { pool, sessions } from '../..';
import { sql } from '@pgtyped/runtime';
import { IGetAllHabitsQuery } from './routes.types';

const habitsRouter = Router();

habitsRouter.get('/', async (req, res) => {
   const userId = sessions[req.cookies.session_id].userId;
   const getAllHabits = sql<IGetAllHabitsQuery>`SELECT * FROM habits WHERE user_id = $userId`;
   const result = await getAllHabits.run({ userId }, pool);
   res.json(result);
});

habitsRouter.post('/', (req, res) => {
   console.log(req.body);
});

export default habitsRouter;
