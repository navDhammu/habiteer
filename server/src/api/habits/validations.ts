import { checkSchema, ParamSchema, validationResult } from 'express-validator';
import { InsertableHabit } from './types';
import { RequestHandler } from 'express';

type CreateHabitSchema = {
   [Key in keyof Omit<InsertableHabit, 'userId'>]: ParamSchema;
};
const schema: CreateHabitSchema = {
   name: { isString: true, exists: true },
   description: { isString: true },
   repeatSchedule: { isArray: true },
};

export const validateCreateHabit: RequestHandler = async (req, res, next) => {
   await checkSchema(schema, ['body']).run(req);
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json(errors);
   next();
};
