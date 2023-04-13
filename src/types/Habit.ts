import { Timestamp } from 'firebase/firestore';

export type Habit = {
   id: string;
   name: string;
   category: string;
   description: string;
   trackingStartDate: Timestamp | Date;
   repeatDays: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
   };
};
