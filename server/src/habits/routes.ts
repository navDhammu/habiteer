import { FastifyPluginAsync } from 'fastify';
import { selectAllHabits } from './queries';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   instance.get('/habits', async (req, res) => {
      const userId = req.session.userId;
      const habits = await selectAllHabits(userId);
      res.send(habits);
   });
};

export default habitsRoutes;
