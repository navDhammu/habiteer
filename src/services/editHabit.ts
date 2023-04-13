import { updateDoc } from 'firebase/firestore';
import { habitsDocRef } from 'lib/db';
import { Habit } from 'types/Habit';

export default function editHabit(
   habitId: string,
   documentFields: Partial<Omit<Habit, 'id'>>
) {
   return updateDoc(habitsDocRef(habitId), {
      lastUpdated: new Date(),
      ...documentFields,
   });
}
