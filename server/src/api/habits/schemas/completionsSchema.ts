import { FromSchema, JSONSchema7 } from 'json-schema-to-ts';

const completionsSchema = {
   type: 'object',
   properties: {
      habitId: {
         type: 'number',
      },
      completionStatus: {
         type: 'string',
         enum: ['complete', 'incomplete', 'pending'],
      },
      scheduledDate: {
         type: 'string',
         format: 'date',
      },
   },
   required: ['habitId', 'completionStatus', 'scheduledDate'],
   additionalProperties: false,
} as const satisfies JSONSchema7;

export const completionsQuerySchema = {
   type: 'object',
   properties: {
      date: {
         type: 'string',
         format: 'date',
      },
   },
} satisfies JSONSchema7;

export const completionsResponseSchema = {
   type: 'array',
   items: completionsSchema,
} as const;

export type CompletionsQuery = FromSchema<typeof completionsQuerySchema>;
export type CompletionsResponse = FromSchema<typeof completionsResponseSchema>;
