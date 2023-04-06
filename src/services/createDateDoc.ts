import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'lib/db';
import { getDayOfWeek } from 'utils/dates';
import { DateDoc } from './docTypes';

export default async function createDateDoc(date: Date) {
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
