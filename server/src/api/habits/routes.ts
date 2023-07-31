import { FastifyPluginAsync } from 'fastify';
import {
   deleteHabit,
   insertCompletions,
   insertHabit,
   selectAllHabits,
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
import { InsertableCompletion, completionsTable, db } from '../../db';
import dayjs from 'dayjs';

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
         const { trackingStartDate, repeatDays } = req.body;

         const habit = await db.transaction(async (tx) => {
            const [insertedHabit] = await insertHabit({
               ...req.body,
               userId: req.session.userId,
            });

            let completions: InsertableCompletion[] = [];

            for (let i = 0; i < 7; i++) {
               const date = dayjs(trackingStartDate).add(i, 'days');
               if (repeatDays.includes(date.format('dddd') as any)) {
                  completions.push({
                     habitId: insertedHabit.id,
                     completionStatus: 'pending',
                     scheduledDate: date.format('YYYY-MM-DD'),
                  });
               }
            }

            await insertCompletions(completions);
            return insertedHabit;
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
};

export default habitsRoutes;
