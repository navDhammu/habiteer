import { JSONSchema, FromSchema } from 'json-schema-to-ts';

export const deleteHabitParamsSchema = {
   type: 'object',
   properties: {
      habitId: {
         type: 'integer',
      },
   },
   required: ['habitId'],
   additionalProperties: false,
} as const satisfies JSONSchema;

export type DeleteHabitParamsType = FromSchema<typeof deleteHabitParamsSchema>;
