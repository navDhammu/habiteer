import { updateDoc } from 'firebase/firestore';
import { habitsDocRef } from 'lib/db';
import { HabitsDoc } from 'types/firestoreDocTypes';

export default function editHabit(
   habitId: string,
   documentFields: Partial<HabitsDoc>
) {
   return updateDoc(habitsDocRef(habitId), {
      lastUpdated: new Date(),
      ...documentFields,
   });
}