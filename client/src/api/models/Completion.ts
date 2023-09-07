/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Completion = {
   id: number;
   habitId: number;
   completionStatus: 'complete' | 'incomplete' | 'pending';
   completionStatusTimestamp: string | null;
   scheduledDate: string;
};
