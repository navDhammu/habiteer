const deleteHabitSchema = {
   operationId: 'deleteHabit',
   tags: ['habits'],
   params: {
      type: 'object',
      properties: {
         habitId: {
            type: 'number',
         },
      },
      required: ['habitId'],
   },
} as const;

export default deleteHabitSchema;
