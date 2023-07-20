import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, insertHabit, selectAllHabits } from './queries';
import { FromSchema } from 'json-schema-to-ts';
import {
   getHabitSchema,
   deleteHabitSchema,
   createHabitSchema,
} from './schemas';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   //get all habits route
   instance.get<GetAllHabitsRoute>(
      '/habits',
      { schema: getHabitSchema },
      async (req, res) => {
         const userId = req.session.userId;
         const habits = await selectAllHabits(userId);
         res.code(200).send(habits);
      }
   );

   //create habit route
   instance.post<CreateHabitRoute>(
      '/habits',
      { schema: createHabitSchema },
      async (req, res) => {
         req.body;
         await insertHabit({ ...req.body, userId: req.session.userId });
         res.send();
      }
   );

   //delete habit route
   instance.delete<DeleteHabitRoute>(
      '/habits/:habitId',
      {
         schema: deleteHabitSchema,
      },
      async (req, res) => {
         await deleteHabit(req.params.habitId);
         res.send();
      }
   );
};

type GetAllHabitsRoute = {
   Reply: {
      200: FromSchema<(typeof getHabitSchema)['response']['200']>;
   };
};

type CreateHabitRoute = {
   Body: FromSchema<(typeof createHabitSchema)['body']>;
};

type DeleteHabitRoute = {
   Params: FromSchema<(typeof deleteHabitSchema)['params']>;
};

export default habitsRoutes;
