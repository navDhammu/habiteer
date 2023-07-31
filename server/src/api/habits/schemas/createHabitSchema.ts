import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { WEEKDAYS } from '../../../utils';

export const createHabitSchema = {
   type: 'object',
   properties: {
      name: {
         type: 'string',
      },
      description: {
         anyOf: [{ type: 'string' }, { type: 'null' }],
      },
      category: {
         anyOf: [{ type: 'string' }, { type: 'null' }],
      },
      trackingStartDate: {
         type: 'string',
         format: 'date',
      },
      repeatDays: {
         type: 'array',
         minItems: 1,
         maxItems: 7,
         items: {
            type: 'string',
            enum: WEEKDAYS,
         },
      },
   },
   required: ['name', 'repeatDays', 'trackingStartDate'],
   additionalProperties: false,
} as const satisfies JSONSchema;

export type CreateHabitType = FromSchema<typeof createHabitSchema>;
