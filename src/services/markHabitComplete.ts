import { increment, writeBatch } from 'firebase/firestore';
import { firestore } from 'lib';
import { db } from 'lib/db';

export default async function markHabitComplete(
   isComplete: boolean,
   habitId: string,
   docId: string
) {
   const batch = writeBatch(firestore);
   batch.update(db.getDocRef('dates', docId), {
      [`habits.${habitId}.isComplete`]: isComplete,
   });
   batch.update(db.getDocRef('habits', habitId), {
      completions: increment(isComplete ? 1 : -1),
   });
   return batch.commit();
}
