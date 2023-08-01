import { FromSchema, JSONSchema7 } from 'json-schema-to-ts';

export const completionsSchema = {
   type: 'object',
   properties: {
      id: {
         type: 'number',
      },
      habitId: {
         type: 'number',
      },
      name: {
         type: 'string',
      },
      description: {
         anyOf: [
            {
               type: 'string',
            },
            { type: 'null' },
         ],
      },
      category: {
         anyOf: [{ type: 'string' }, { type: 'null' }],
      },
      completionStatus: {
         type: 'string',
         enum: ['complete', 'incomplete', 'pending'] as const,
      },
      scheduledDate: {
         type: 'string',
         format: 'date',
      },
   },
   required: [
      'id',
      'completionStatus',
      'scheduledDate',
      'name',
      'category',
      'description',
   ],
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
