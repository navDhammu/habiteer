import { FastifyPluginAsync } from 'fastify';
import {
   deleteHabit,
   createHabitTransaction,
   selectAllHabits,
   selectCompletions,
} from './queries';

import {
   CreateHabitType,
   createHabitSchema,
} from './schemas/createHabitSchema';
import {
   DeleteHabitParamsType,
   deleteHabitParamsSchema,
} from './schemas/deleteHabitParamsSchema';
import {
   habitSchema,
   habitsResponse,
   HabitsResponse,
} from './schemas/habitSchema';
import { FromSchema } from 'json-schema-to-ts';
import { InsertableCompletion, db } from '../../db';
import dayjs from 'dayjs';
import {
   completionsQuerySchema,
   completionsResponseSchema,
   CompletionsQuery,
   CompletionsResponse,
} from './schemas/completionsSchema';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   // get habits route
   instance.get<{ Reply: { 200: HabitsResponse } }>(
      '/habits',
      {
         schema: {
            operationId: 'getHabits',
            tags: ['habits'],
            response: {
               200: habitsResponse,
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
      Body: CreateHabitType;
      Reply: { 200: FromSchema<typeof habitSchema> };
   }>(
      '/habits',
      {
         schema: {
            tags: ['habits'],
            operationId: 'createHabit',
            body: createHabitSchema,
            response: {
               200: habitSchema,
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

   // completions route
   instance.get<{
      Querystring: CompletionsQuery;
      Reply: { 200: CompletionsResponse };
   }>(
      '/habits/completions',
      {
         schema: {
            tags: ['habits'],
            operationId: 'getCompletions',
            querystring: completionsQuerySchema,
            response: {
               200: completionsResponseSchema,
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
