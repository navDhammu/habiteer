import useValidContext from 'context/useValidContext';
import { createContext } from 'react';
import { Habit } from '@api';

export type HabitsContextType = {
   habits: Habit[];
   isLoading: boolean;
   error: null | Error;
   deleteHabit: (id: Habit['id']) => void;
};

export const HabitsContext = createContext<HabitsContextType | null>(null);

export const useHabitsContext = () => useValidContext(HabitsContext);
