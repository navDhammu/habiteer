import { ErrorRequestHandler, Router } from 'express';
import { getAllHabits, createHabit, deleteHabit } from './habits.queries';
import { validateCreateHabit } from './validations';

const habitsRouter = Router();

//Get all habits
habitsRouter.get('/', async (req, res, next) => {
   try {
      const habits = await getAllHabits(req.user?.id!);
      res.json(habits);
   } catch (error) {
      next(error);
   }
});

//Create a habit
habitsRouter.post('/', validateCreateHabit, async (req, res, next) => {
   try {
      await createHabit({ user_id: req.user.id!, ...req.body });
      res.sendStatus(201);
   } catch (error) {
      next(error);
   }
});

//delete habit
habitsRouter.delete('/:id', async (req, res, next) => {
   try {
      const result = await deleteHabit(Number(req.params.id));
      res.sendStatus(result.numDeletedRows > 0 ? 204 : 404);
   } catch (error) {
      next(error);
   }
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
   console.log('inside error handler');
   console.log(err);
   res.send(err).end();
};

habitsRouter.use(errorHandler);

export default habitsRouter;
