import { Router } from 'express';
import { body } from 'express-validator';
import { pool, sessions } from '../..';
import { getAllHabits } from './habits.services';

const habitsRouter = Router();

habitsRouter.get('/', async (req, res) => {
   try {
      const habits = await getAllHabits(req.user?.id!);
      res.json(habits);
   } catch (e) {
      res.sendStatus(500);
   }
});

export default habitsRouter;
