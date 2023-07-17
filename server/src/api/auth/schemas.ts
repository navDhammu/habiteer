const signupSchema = {
   body: {
      type: 'object',
      properties: {
         email: {
            type: 'string',
            format: 'email',
         },
         password: {
            type: 'string',
            minLength: 6,
         },
         confirmPassword: {
            const: {
               $data: '1/password',
            },
         },
      },
      required: ['email', 'password', 'confirmPassword'],
   } as const,
};

const loginSchema = {
   body: {
      type: 'object',
      properties: {
         email: {
            type: 'string',
            format: 'email',
         },
         password: {
            type: 'string',
            minLength: 6,
         },
      },
      required: ['email', 'password'],
   } as const,
};

export { signupSchema, loginSchema };
