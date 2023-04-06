import {
   deleteField,
   getDocs,
   orderBy,
   query,
   writeBatch,
} from 'firebase/firestore';
import { firestore } from 'lib';
import { db } from 'lib/db';

export default async function deleteHabit(habitId) {
   const q = query(db.getColRef('dates'), orderBy(`${habitId}`));
   const batch = writeBatch(firestore);
   const snapshot = await getDocs(q);

   snapshot.forEach((doc) => {
      batch.update(db.getDocRef('dates', doc.id), { [habitId]: deleteField() });
   });
   batch.delete(db.getDocRef('habits', habitId));
   return batch.commit();
}
