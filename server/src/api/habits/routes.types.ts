/** Types generated for queries found in "src/api/habits/routes.ts" */
export type stringArray = (string)[];

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

