import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, insertHabit, selectAllHabits } from './queries';

import {
   HabitsResponseType,
   habitsResponseSchema,
} from './schemas/habitsResponseSchema';
import {
   CreateHabitType,
   createHabitSchema,
} from './schemas/createHabitSchema';
import {
   DeleteHabitParamsType,
   deleteHabitParamsSchema,
} from './schemas/deleteHabitParamsSchema';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   //get all habits route
   instance.get<{ Reply: { 200: HabitsResponseType } }>(
      '/habits',
      {
         schema: {
            operationId: 'getAllHabits',
            tags: ['habits'],
            response: {
               200: habitsResponseSchema,
            },
         },
      },
      async (req, res) => {
         const userId = req.session.userId;
         const habits = await selectAllHabits(userId);
         res.code(200).send(habits);
      }
   );

   //create habit route
   instance.post<{ Body: CreateHabitType }>(
      '/habits',
      {
         schema: {
            tags: ['habits'],
            operationId: 'createHabit',
            body: createHabitSchema,
         },
      },
      async (req, res) => {
         await insertHabit({ ...req.body, userId: req.session.userId });
         res.send();
      }
   );

   //delete habit route
   instance.delete<{ Params: DeleteHabitParamsType }>(
      '/habits/:habitId',
      {
         schema: {
            operationId: 'deleteHabit',
            tags: ['habits'],
            params: deleteHabitParamsSchema,
         },
      },
      async (req, res) => {
         await deleteHabit(req.params.habitId);
         res.send();
      }
   );
};

export default habitsRoutes;
