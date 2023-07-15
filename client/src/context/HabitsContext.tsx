import useValidContext from 'hooks/useValidContext';
import { createContext } from 'react';
import { Habit } from 'types/Habit';
import { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';
import useAPI from 'hooks/useAPI';
import habitsAPI from 'src/api/habitsAPI';

export type HabitsContextType = {
   habits: Habit[];
   isLoading: boolean;
   error: Error | null;
};
export const HabitsContext = createContext<HabitsContextType | null>(null);

export const useHabitsContext = () => useValidContext(HabitsContext);

export default function HabitsProvider(props: PropsWithChildren) {
   const { user } = useAuthContext();
   const { data, isLoading, error } = useAPI(habitsAPI.getAll, {
      condition: !!user,
      dependency: [user],
   });

   console.log(data);

   return (
      <HabitsContext.Provider value={{ habits: data ?? [], isLoading, error }}>
         {props.children}
      </HabitsContext.Provider>
   );
}
