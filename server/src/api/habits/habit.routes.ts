import { Router } from 'express';
import { getAllHabits } from '../../db/habitsTable';

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
