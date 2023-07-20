export const getHabitSchema = {
   operationId: 'getAllHabits',
   tags: ['habits'],
   response: {
      200: {
         type: 'array',
         items: {
            type: 'object',
            properties: {
               name: {
                  type: 'string',
               },
               description: {
                  anyOf: [
                     {
                        type: 'string',
                     },
                     {
                        type: 'null',
                     },
                  ],
               },
               category: {
                  anyOf: [
                     {
                        type: 'string',
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
            required: [
               'description',
               'name',
               'id',
               'category',
               'trackingStartDate',
               'repeatDays',
               'created',
               'lastUpdated',
            ],
         },
         additionalProperties: false,
      },
   },
} as const;
