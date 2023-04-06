import { addDoc } from 'firebase/firestore';
import { db } from 'lib/db';
import { HabitsDoc } from './docTypes';

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
   return addDoc(db.getColRef('habits'), {
      createdOn: new Date(),
      completions: 0,
      currentStreak: 0,
      bestStreak: 0,
      ...documentFields,
   }).catch((err) => console.log('error', err));
}
