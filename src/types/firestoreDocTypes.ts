import { Habit } from './Habit';

export type HabitsDoc = Omit<Habit, 'id'> & {
   createdOn: Date;
   lastUpdated: Date;
   completions: number;
   currentStreak: number;
   bestStreak: number;
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
