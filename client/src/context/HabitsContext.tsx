import useValidContext from 'hooks/useValidContext'
import { createContext } from 'react'
import { Habit } from 'types/Habit'

export type HabitsContextType = {
    habits: Habit[]
    isLoading: boolean
    error: string
}
export const HabitsContext = createContext<HabitsContextType | null>(null)

export const useHabitsContext = () => useValidContext(HabitsContext)
