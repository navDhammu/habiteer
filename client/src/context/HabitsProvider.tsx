import { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { useAuthContext } from './AuthContext';
import { Habit, HabitsService } from '@api';
import { HabitsContext, HabitsContextType } from './HabitsContext';

export default function HabitsProvider(props: PropsWithChildren) {
   const { user } = useAuthContext();
   const [habits, setHabits] = useState<HabitsContextType['habits']>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const deleteHabit = (id: number) => {
      setHabits(habits.filter((habit) => habit.id !== id));
   };

   const addHabit = (habit: Habit) => setHabits([...habits, habit]);

   useEffect(() => {
      if (user) {
         setIsLoading(true);
         HabitsService.getHabits()
            .then((habits) => setHabits(habits))
            .catch((err) => {
               setError(err);
            })
            .finally(() => setIsLoading(false));
      }
   }, [user]);

   const contextValue = {
      habits,
      isLoading,
      error,
      deleteHabit,
      addHabit,
   } satisfies HabitsContextType;

   return (
      <HabitsContext.Provider value={contextValue}>
         {props.children}
      </HabitsContext.Provider>
   );
}
