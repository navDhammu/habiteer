export type Habit = {
   id: string;
   name: string;
   category: string;
   description: string;
   trackingStartDate: Date;
   repeatSchedule: {
      frequency: 'daily' | 'weekly';
      days: string[];
   };
};
