import { FastifyPluginAsync } from 'fastify';
import { deleteHabit, insertHabit, selectAllHabits } from './queries';

import {
   CreateHabitType,
   createHabitSchema,
} from './schemas/createHabitSchema';
import {
   DeleteHabitParamsType,
   deleteHabitParamsSchema,
} from './schemas/deleteHabitParamsSchema';
import { habitSchema } from './schemas/habitSchema';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const habitsRoutes: FastifyPluginAsync = async (instance, opts) => {
   //get all habits route
   const habitsResponseSchema = {
      type: 'array',
      items: habitSchema,
   } satisfies JSONSchema;

   instance.get<{ Reply: { 200: FromSchema<typeof habitsResponseSchema> } }>(
      '/habits',
      {
         schema: {
            operationId: 'getAllHabits',
            tags: ['habits'],
            response: {
               200: {
                  type: 'array',
                  items: habitSchema,
               },
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
         const [habit] = await insertHabit({
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
};

export default habitsRoutes;
