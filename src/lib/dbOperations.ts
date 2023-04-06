import {
   addDoc,
   deleteField,
   getDocs,
   increment,
   orderBy,
   query,
   updateDoc,
   where,
   writeBatch,
} from '@firebase/firestore';
import { Habit } from 'components/layout/AppLayout';
import { firestore } from 'lib';
import { getDayOfWeek } from 'utils/dates';
import { db } from './db';

export type HabitDetails = Omit<Habit, 'id'>;

export type DateDoc = {
   date: Date;
   habits: {
      [id: string]: {
         isComplete: boolean;
         name: string;
      };
   };
};

//Create new habit
export function createHabit(
   documentFields: HabitDetails | Partial<HabitDetails>
) {
   if (
      !(
         'name' in documentFields &&
         'trackingStartDate' in documentFields &&
         'repeatDays' in documentFields
      )
   ) {
      throw new Error('incorrect HabitDetails for createHabit');
   }
   return addDoc(db.getColRef('habits'), {
      createdOn: new Date(),
      completions: 0,
      currentStreak: 0,
      bestStreak: 0,
      ...documentFields,
   }).catch((err) => console.log('error', err));
}

//edit existing habit
export function editHabit(
   habitId: string,
   documentFields: Partial<HabitDetails>
) {
   return updateDoc(db.getDocRef('habits', habitId), {
      lastUpdated: new Date(),
      ...documentFields,
   });
}

//delete habit
export async function deleteHabit(habitId) {
   const q = query(db.getColRef('dates'), orderBy(`${habitId}`));
   const batch = writeBatch(firestore);
   const snapshot = await getDocs(q);

   snapshot.forEach((doc) => {
      batch.update(db.getDocRef('dates', doc.id), { [habitId]: deleteField() });
   });
   batch.delete(db.getDocRef('habits', habitId));
   return batch.commit();
}

export async function markHabitComplete(
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

export async function createDateDoc(date: Date) {
   const querySnapshot = await getDocs(
      query(
         db.getColRef('habits'),
         where('repeatDays', 'array-contains', getDayOfWeek(date))
      )
   );

   const habits: DateDoc['habits'] = {};

   querySnapshot.forEach((doc) => {
      habits[doc.id] = {
         name: doc.get('name'),
         isComplete: false,
      };
   });

   return addDoc(db.getColRef('dates'), { date, habits });
}
