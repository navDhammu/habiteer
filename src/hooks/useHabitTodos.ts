import { limit, onSnapshot, query, where } from '@firebase/firestore';
import { endOfDay, isToday, startOfDay } from 'date-fns';
import { datesColRef } from 'lib/db';
import { HabitTodo } from 'pages/today';
import { useEffect, useRef, useState } from 'react';
import createDateDoc from 'services/createDateDoc';
import { DateDoc } from 'services/docTypes';
import markHabitComplete from 'services/markHabitComplete';
import { AppContext, useAppContext } from './useAppContext';

type HandleCheck = AppContext['today']['handleCheck'];

export default function useHabitTodos(date: Date): [HabitTodo[], HandleCheck] {
   const appContext = useAppContext();
   const [habitTodos, setHabitTodos] = useState<HabitTodo[]>([]);
   const documentId = useRef<string>(null);

   const handleCheckTodo: HandleCheck = (id) => (e) =>
      markHabitComplete(e.target.checked, id, documentId.current);

   // Do not attach a listener for today document if its already there
   // Today document listener is attached on initial load in app layout
   const shouldAttachListener = !(appContext?.today?.todos && isToday(date));

   useEffect(() => {
      if (!shouldAttachListener) return;
      return onSnapshot(
         query(
            datesColRef(),
            where('date', '>=', startOfDay(date)),
            where('date', '<=', endOfDay(date)),
            limit(1)
         ),
         async ({ empty, docs }) => {
            if (empty) {
               // creating a document triggers this function to run again, after which the code in else block is executed
               createDateDoc(date);
            } else {
               documentId.current = docs[0].id;
               const habits: DateDoc['habits'] = docs[0].get('habits');
               setHabitTodos(
                  Object.entries(habits).map<HabitTodo>(([id, habit]) => ({
                     id,
                     isComplete: habit.isComplete,
                     name: habit.name,
                  }))
               );
            }
         },
         (error) => console.log(error.code)
      );
   }, [date]);

   return shouldAttachListener
      ? [habitTodos, handleCheckTodo]
      : [appContext.today.todos, appContext.today.handleCheck];
}
