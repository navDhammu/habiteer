const deleteParamsSchema = {
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

export { deleteParamsSchema };
