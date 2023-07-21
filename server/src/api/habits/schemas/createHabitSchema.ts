import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const createHabitSchema = {
   type: 'object',
   properties: {
      name: {
         type: 'string',
      },
      description: {
         type: 'string',
      },
      category: {
         type: 'string',
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
            enum: [
               'monday',
               'tuesday',
               'wednesday',
               'thursday',
               'friday',
               'saturday',
               'sunday',
            ],
         },
      },
   },
   required: ['name', 'repeatDays', 'trackingStartDate'],
   additionalProperties: false,
} as const satisfies JSONSchema;

export type CreateHabitType = FromSchema<typeof createHabitSchema>;
