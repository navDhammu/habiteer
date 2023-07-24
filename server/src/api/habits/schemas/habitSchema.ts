import { JSONSchema7 } from 'json-schema-to-ts';

export const habitSchema = {
   type: 'object',
   properties: {
      id: { type: 'integer' },
      name: {
         type: 'string',
      },
      description: {
         anyOf: [{ type: 'string' }, { type: 'null' }],
      },
      category: {
         anyOf: [{ type: 'string' }, { type: 'null' }],
      },
      created: {
         type: 'string',
         format: 'date',
      },
      lastUpdated: {
         anyOf: [
            {
               type: 'string',
               format: 'date',
            },
            {
               type: 'null',
            },
         ],
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
   additionalProperties: false,
   required: [
      'id',
      'name',
      'repeatDays',
      'trackingStartDate',
      'created',
      'lastUpdated',
      'description',
      'category',
   ],
} as const satisfies JSONSchema7;
