import {
   deleteField,
   getDocs,
   orderBy,
   query,
   writeBatch,
} from 'firebase/firestore';
import { firestore } from 'lib';
import { datesColRef, datesDocRef, habitsDocRef } from 'lib/db';

export default async function deleteHabit(habitId: string) {
   const q = query(datesColRef(), orderBy(`${habitId}`));
   const batch = writeBatch(firestore);
   const snapshot = await getDocs(q);

   snapshot.forEach((doc) => {
      batch.update(datesDocRef(doc.id), { [habitId]: deleteField() });
   });
   batch.delete(habitsDocRef(habitId));
   return batch.commit();
}
