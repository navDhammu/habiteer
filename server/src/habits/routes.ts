import {
   FastifyPluginAsyncTypebox,
   Type,
} from '@fastify/type-provider-typebox';
import { selectCompletionSchema } from '../completions/dbSchema';
import { insertHabitSchema, selectHabitSchema } from './dbSchema';
import {
   createHabitTransaction,
   deleteHabit,
   selectAllHabits,
   selectCompletionsByDateRange,
   updateCompletionStatus,
} from './queries';

const habitsRoutes: FastifyPluginAsyncTypebox = async (instance, opts) => {
   // get habits route
   instance.get(
      '/habits',
      {
         schema: {
            operationId: 'getHabits',
            tags: ['habits'],
            response: {
               200: Type.Array(selectHabitSchema),
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
   instance.post(
      '/habits',
      {
         schema: {
            tags: ['habits'],
            operationId: 'createHabit',
            body: Type.Omit(insertHabitSchema, ['id', 'userId']),
            response: {
               200: selectHabitSchema,
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
   instance.delete(
      '/habits/:habitId',
      {
         schema: {
            operationId: 'deleteHabit',
            tags: ['habits'],
            params: Type.Pick(selectHabitSchema, ['id']),
         },
      },
      async (req, res) => {
         await deleteHabit(req.params.id);
         res.send();
      }
   );

   // completions route
   instance.get(
      '/habits/completions',
      {
         schema: {
            tags: ['habits'],
            operationId: 'getCompletions',
            querystring: Type.Object({
               from: Type.String({ format: 'date' }),
               to: Type.String({ format: 'date' }),
            }),
            response: {
               200: Type.Array(selectCompletionSchema),
            },
         },
      },
      async (req, res) => {
         const completions = await selectCompletionsByDateRange(
            req.session.userId,
            req.query.from,
            req.query.to
         );

         return res.code(200).send(completions);
      }
   );

   instance.patch(
      '/habits/completions/:id',
      {
         schema: {
            tags: ['habits'],
            operationId: 'updateCompletionStatus',
            body: Type.Pick(selectCompletionSchema, ['completionStatus']),
            params: Type.Pick(selectCompletionSchema, ['id']),
            response: {
               200: selectCompletionSchema,
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
