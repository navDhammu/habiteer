import { CompletionDb, HabitDb, InsertableHabitDb } from '../../db';

export interface Habit extends HabitDb {
   /**
    * @format date
    */
   trackingStartDate: HabitDb['trackingStartDate'];
}

export type Habits = Habit[];

export interface HabitReqBody
   extends Pick<
      InsertableHabitDb,
      'name' | 'description' | 'repeatDays' | 'category' | 'trackingStartDate'
   > {
   /**
    * @format date
    */
   trackingStartDate: InsertableHabitDb['trackingStartDate'];
   /**
    * @minItems 1
    * @maxItems 7
    */
   repeatDays: InsertableHabitDb['repeatDays'];
}

export interface DeleteHabitParams {
   habitId: HabitDb['id'];
}

export type CompletionsQuerystring =
   | {
        /**
         * @format date
         */
        date: string;
        from?: never;
        to?: never;
     }
   | {
        date?: never;
        /**
         * @format date
         */
        from: string;
        /**
         * @format date
         */
        to: string;
     };

export interface Completion
   extends CompletionDb,
      Pick<HabitDb, 'name' | 'description' | 'category'> {
   /**
    * @format date
    */
   scheduledDate: string;

   /**
    * @format date-time
    */
   completionStatusTimestamp: CompletionDb['completionStatusTimestamp'];
}

export type UpdateCompletionStatusBody = Pick<Completion, 'completionStatus'>;
export type UpdateCompletionStatusParams = Pick<Completion, 'id'>;

export type Completions = Completion[];
