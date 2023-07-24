/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Habit = {
    id: number;
    name: string;
    description: (string | null);
    category: (string | null);
    created: string;
    lastUpdated: (string | null);
    trackingStartDate: string;
    repeatDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
};

