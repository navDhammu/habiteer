import { increment, writeBatch } from 'firebase/firestore';
import { firestore } from 'lib';
import { datesDocRef, habitsDocRef } from 'lib/db';

export default async function markHabitComplete(
   isComplete: boolean,
   habitId: string,
   docId: string
) {
   const batch = writeBatch(firestore);
   batch.update(datesDocRef(docId), `habits.${habitId}.isComplete`, isComplete);
   batch.update(habitsDocRef(habitId), {
      completions: increment(isComplete ? 1 : -1),
   });
   return batch.commit();
}
