import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { habitSchema } from './habitSchema';

export const habitsResponseSchema = {
   type: 'array',
   items: habitSchema,
} as const satisfies JSONSchema;

export type HabitsResponseType = FromSchema<typeof habitsResponseSchema>;
