import { Habit } from 'components/layout/AppLayout';

export type HabitsDoc = Omit<Habit, 'id'>;

export type DateDoc = {
   date: Date;
   habits: {
      [id: string]: {
         isComplete: boolean;
         name: string;
      };
   };
};
