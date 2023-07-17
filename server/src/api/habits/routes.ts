import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, insertHabit, selectAllHabits } from './queries';
import { FromSchema } from 'json-schema-to-ts';
import { createHabitBodySchema, deleteParamsSchema } from './schemas';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   instance.get('/habits', async (req, res) => {
      const userId = req.session.userId;
      const habits = await selectAllHabits(userId);
      res.send(habits);
   });

   instance.post<{ Body: FromSchema<(typeof createHabitBodySchema)['body']> }>(
      '/habits',
      { schema: createHabitBodySchema },
      async (req, res) => {
         await insertHabit({ ...req.body, userId: req.session.userId });
         res.send();
      }
   );

   instance.delete<{
      Params: FromSchema<(typeof deleteParamsSchema)['params']>;
   }>(
      '/habits/:habitId',
      {
         schema: deleteParamsSchema,
      },
      async (req, res) => {
         await deleteHabit(req.params.habitId);
         res.send();
      }
   );
};

export default habitsRoutes;
