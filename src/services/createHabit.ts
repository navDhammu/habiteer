import { addDoc } from 'firebase/firestore';
import { habitsColRef } from 'lib/db';
import { HabitsDoc } from 'types/firestoreDocTypes';

export default function createHabit(
   documentFields: HabitsDoc | Partial<HabitsDoc>
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
   return addDoc(habitsColRef(), {
      createdOn: new Date(),
      completions: 0,
      currentStreak: 0,
      bestStreak: 0,
      ...documentFields,
   }).catch((err) => console.log('error', err));
}