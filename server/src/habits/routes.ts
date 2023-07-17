import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, selectAllHabits } from './db';
import { FromSchema } from 'json-schema-to-ts';
import { deleteParamsSchema } from './schemas';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   instance.get('/habits', async (req, res) => {
      const userId = req.session.userId;
      const habits = await selectAllHabits(userId);
      res.send(habits);
   });

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
