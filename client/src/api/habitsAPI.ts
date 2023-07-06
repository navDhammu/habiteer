import { CreatableHabit, EditableHabit, Habit } from 'types/Habit';
import fetchWrapper from '.';

export default {
   getAll: async () => {
      const response = await fetchWrapper('http://localhost:3000/api/habits', {
         credentials: 'include',
      });
      return response.json() as Promise<Habit[]>;
   },
   create: async (habit: CreatableHabit) => {
      await fetchWrapper('http://localhost:3000/api/habits', {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(habit),
      });
   },
   edit: async (habit: EditableHabit) => {
      await fetchWrapper(`http://localhost:3000/api/habits${habitId}`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(habit),
      });
   },
};
