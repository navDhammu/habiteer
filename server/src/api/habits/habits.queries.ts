/** Types generated for queries found in "src/api/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type stringArray = string[];

/** 'GetAllHabits' parameters type */
export interface IGetAllHabitsParams {
   userId?: number | null | void;
}

/** 'GetAllHabits' return type */
export interface IGetAllHabitsResult {
   created: Date;
   description: string | null;
   id: number;
   lastUpdated: Date | null;
   name: string;
   repeatSchedule: stringArray;
   userId: number;
}

/** 'GetAllHabits' query type */
export interface IGetAllHabitsQuery {
   params: IGetAllHabitsParams;
   result: IGetAllHabitsResult;
}

const getAllHabitsIR: any = {
   usedParamSet: { userId: true },
   params: [
      { name: 'userId', required: false, transform: { type: 'scalar' }, locs: [{ a: 37, b: 43 }] },
   ],
   statement: 'SELECT * FROM habits WHERE user_id = :userId',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM habits WHERE user_id = :userId
 * ```
 */
export const getAllHabits = new PreparedQuery<IGetAllHabitsParams, IGetAllHabitsResult>(
   getAllHabitsIR
);
