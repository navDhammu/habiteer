import { FastifyPluginAsync } from 'fastify';
import {
   createHabitTransaction,
   deleteHabit,
   selectAllHabits,
   selectCompletionsByDate,
   selectCompletionsByDateRange,
   updateCompletionStatus,
} from './queries';

import schema from './schema.json';
import {
   Completion,
   Completions,
   CompletionsQuerystring,
   DeleteHabitParams,
   Habit,
   HabitReqBody,
   Habits,
   UpdateCompletionStatusBody,
   UpdateCompletionStatusParams,
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
         let completions;
         if (req.query.date) {
            completions = await selectCompletionsByDate(
               req.session.userId,
               req.query.date
            );
         } else if (req.query.from) {
            completions = await selectCompletionsByDateRange(
               req.session.userId,
               req.query.from,
               req.query.to
            );
         }

         return res.code(200).send(completions);
      }
   );

   instance.patch<{
      Body: UpdateCompletionStatusBody;
      Params: UpdateCompletionStatusParams;
      Reply: Completion;
   }>(
      '/habits/completions/:id',
      {
         schema: {
            tags: ['habits'],
            operationId: 'updateCompletionStatus',
            body: schema.definitions.UpdateCompletionStatusBody,
            params: schema.definitions.UpdateCompletionStatusParams,
            response: {
               200: schema.definitions.Completion,
            },
         },
      },
      async (req, res) => {
         const updatedCompletion = await updateCompletionStatus(
            req.params.id,
            req.body.completionStatus
         );
         res.code(200).send(updatedCompletion);
      }
   );
};

export default habitsRoutes;
