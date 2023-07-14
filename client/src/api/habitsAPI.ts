import { CreatableHabit, EditableHabit, Habit } from 'types/Habit';
import fetchWrapper, { BASE_URL } from '.';

export default {
   getAll: async () => {
      const response = await fetchWrapper(`${BASE_URL}/habits`, {
         credentials: 'include',
      });
      return response.json() as Promise<Habit[]>;
   },
   create: async (habit: CreatableHabit) => {
      await fetchWrapper(`${BASE_URL}/habits`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(habit),
      });
   },
   edit: async (habit: EditableHabit) => {
      await fetchWrapper(`${BASE_URL}/habits/${habit}`, {
         method: 'PATCH',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(habit),
      });
   },
};
