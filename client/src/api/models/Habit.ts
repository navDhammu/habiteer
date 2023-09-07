/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Habit = {
   id: number;
   name: string;
   description: string | null;
   repeatDays: Array<
      | 'Sunday'
      | 'Monday'
      | 'Tuesday'
      | 'Wednesday'
      | 'Thursday'
      | 'Friday'
      | 'Saturday'
   >;
   created: string;
   lastUpdated: string | null;
   userId: number;
   category: string | null;
   trackingStartDate: string;
};
