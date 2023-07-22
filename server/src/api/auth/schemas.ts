import { FromSchema, JSONSchema7 } from 'json-schema-to-ts';

const signupBodySchema = {
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
} as const satisfies JSONSchema7;

type SignupBodyType = FromSchema<typeof signupBodySchema>;

const loginBodySchema = {
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
} as const satisfies JSONSchema7;

type LoginBodyType = FromSchema<typeof loginBodySchema>;

export { signupBodySchema, loginBodySchema, SignupBodyType, LoginBodyType };
