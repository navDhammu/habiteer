import { FastifyPluginAsync } from 'fastify';
import {
   deleteHabit,
   createHabitTransaction,
   selectAllHabits,
   selectCompletions,
} from './queries';

import schema from './schema.json';
import {
   Habit,
   DeleteHabitParams,
   CompletionsQuerystring,
   Completions,
   Habits,
   HabitReqBody,
} from './types';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   // get habits route
   instance.get<{ Reply: { 200: Habits } }>(
      '/habits',
      {
         schema: {
            operationId: 'getHabits',
            tags: ['habits'],
            response: {
               200: schema.definitions.Habits,
            },
         },
      },
      async (req, res) => {
         const userId = req.session.userId;
         res.code(200).send(await selectAllHabits(userId));
      }
   );

   //create habit route
   instance.post<{
      Body: HabitReqBody;
      Reply: { 200: Habit };
   }>(
      '/habits',
      {
         schema: {
            tags: ['habits'],
            operationId: 'createHabit',
            body: schema.definitions.HabitReqBody,
            response: {
               200: schema.definitions.Habit,
            },
         },
      },
      async (req, res) => {
         const habit = await createHabitTransaction({
            ...req.body,
            userId: req.session.userId,
         });

         res.code(200).send(habit);
      }
   );

   //delete habit route
   instance.delete<{ Params: DeleteHabitParams }>(
      '/habits/:habitId',
      {
         schema: {
            operationId: 'deleteHabit',
            tags: ['habits'],
            params: schema.definitions.DeleteHabitParams,
         },
      },
      async (req, res) => {
         await deleteHabit(req.params.habitId);
         res.send();
      }
   );

   // completions route
   instance.get<{
      Querystring: CompletionsQuerystring;
      Reply: { 200: Completions };
   }>(
      '/habits/completions',
      {
         schema: {
            tags: ['habits'],
            operationId: 'getCompletions',
            querystring: schema.definitions.CompletionsQuerystring,
            response: {
               200: schema.definitions.Completions,
            },
         },
      },
      async (req, res) => {
         const completions = await selectCompletions(
            req.session.userId,
            req.query.date
         );
         res.code(200).send(completions);
      }
   );
};

export default habitsRoutes;
