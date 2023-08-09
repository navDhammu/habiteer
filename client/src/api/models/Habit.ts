/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Habit = {
   category: string | null;
   created: string;
   description: string | null;
   id: number;
   lastUpdated: string | null;
   name: string;
   repeatDays: Array<
      | 'Friday'
      | 'Monday'
      | 'Saturday'
      | 'Sunday'
      | 'Thursday'
      | 'Tuesday'
      | 'Wednesday'
   >;
   trackingStartDate: string;
   userId: number;
};
