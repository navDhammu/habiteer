import { updateDoc } from 'firebase/firestore';
import { db } from 'lib/db';
import { HabitsDoc } from './docTypes';

export default function editHabit(
   habitId: string,
   documentFields: Partial<HabitsDoc>
) {
   return updateDoc(db.getDocRef('habits', habitId), {
      lastUpdated: new Date(),
      ...documentFields,
   });
}
