import { Habit } from 'components/layout/AppLayout';

export type HabitsDoc = Omit<Habit, 'id'> & {
   createdOn: Date;
   lastUpdated: Date;
   completions: 0;
   currentStreak: 0;
   bestStreak: 0;
};

export type DateDoc = {
   date: Date;
   habits: {
      [id: string]: {
         isComplete: boolean;
         name: string;
      };
   };
};
