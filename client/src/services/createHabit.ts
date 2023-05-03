import { startOfDay } from 'date-fns';
import {
   addDoc,
   doc,
   getDocs,
   query,
   where,
   writeBatch,
} from 'firebase/firestore';
import { firestore } from 'lib';
import { datesColRef, habitsColRef } from 'lib/db';
import { Habit } from 'types/Habit';
import { getDayOfWeek } from 'utils/dates';

export default async function createHabit(details: Omit<Habit, 'id'>) {
   const additionalData = {
      createdOn: new Date(),
      lastUpdated: new Date(),
      completions: 0,
      currentStreak: 0,
      bestStreak: 0,
   };

   const habitData = { ...details, ...additionalData };

   try {
      const q = query(
         datesColRef(),
         where('date', '>=', startOfDay(details.trackingStartDate.toDate()))
      );
      const dateDocsSnapshot = await getDocs(q);

      if (dateDocsSnapshot.empty) return addDoc(habitsColRef(), habitData);

      const habitDocRef = doc(habitsColRef());
      const batch = writeBatch(firestore);
      dateDocsSnapshot.forEach((doc) => {
         if (details.repeatDays[getDayOfWeek(doc.data().date)]) {
            batch.update(doc.ref, {
               [`habits.${habitDocRef.id}`]: {
                  isComplete: false,
                  name: details.name,
               },
            });
         }
      });

      batch.set(habitDocRef, habitData);
      return batch.commit();
   } catch (e) {
      throw new Error('error creating habit');
   }
}
