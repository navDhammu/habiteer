import { addDoc } from 'firebase/firestore';
import { habitsColRef } from 'lib/db';
import { Habit } from 'types/Habit';

export default function createHabit(documentFields: Omit<Habit, 'id'>) {
   return addDoc(habitsColRef(), {
      ...documentFields,
      createdOn: new Date(),
      lastUpdated: new Date(),
      completions: 0,
      currentStreak: 0,
      bestStreak: 0,
   }).catch((err) => console.log('error', err));
}
