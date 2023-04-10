import { HabitTodo } from 'pages/today';
import { useOutletContext } from 'react-router-dom';
import { Habit } from 'types/Habit';

export type AppContext = {
   habits: Habit[];
   today: {
      todos: HabitTodo[];
      handleCheck: (
         id: string
      ) => (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
   };
};

export function useAppContext() {
   return useOutletContext<AppContext>();
}
