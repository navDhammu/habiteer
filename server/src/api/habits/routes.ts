import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, insertHabit, selectAllHabits } from './queries';
import { FromSchema } from 'json-schema-to-ts';
import {
   createHabitSchema,
   deleteHabitSchema,
   getHabitSchema,
} from './schemas';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   instance.get('/habits', { schema: getHabitSchema }, async (req, res) => {
      const userId = req.session.userId;
      const habits = await selectAllHabits(userId);
      res.send(habits);
   });

   instance.post<{ Body: FromSchema<(typeof createHabitSchema)['body']> }>(
      '/habits',
      { schema: createHabitSchema },
      async (req, res) => {
         await insertHabit({ ...req.body, userId: req.session.userId });
         res.send();
      }
   );

   instance.delete<{
      Params: FromSchema<(typeof deleteHabitSchema)['params']>;
   }>(
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

export default habitsRoutes;
