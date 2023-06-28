import { Router } from 'express';
import { getAllHabits, createHabit } from './habits.queries';
import { body } from 'express-validator';

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
