import { Box, Flex } from '@chakra-ui/react';
import { onSnapshot, query } from '@firebase/firestore';
import { AppContext } from 'hooks/useAppContext';
import useHabitTodos from 'hooks/useHabitTodos';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { habitsCollection } from '../../services/firestoreReferences';
import Header from './Header';
import Sidebar from './sidebar';

const SIDEBAR_BREAKPOINT = 768;

export type Habit = {
   id: string;
   name: string;
   category: string;
   description: string;
   trackingStartDate: string;
   repeatDays: string[];
};

const today = new Date();

export default function AppLayout({ user }) {
   const [habits, setHabits] = useState<Habit[]>([]);
   const [todayHabitTodos, handleCheckHabit] = useHabitTodos(today);
   const [isLoadingHabits, setIsLoadingHabits] = useState(true);

   const appContext: AppContext = {
      habits,
      today: { todos: todayHabitTodos, handleCheck: handleCheckHabit },
   };

   useEffect(() => {
      if (user) {
         return onSnapshot(
            query(habitsCollection()),
            { includeMetadataChanges: true },
            (snapshot) => {
               if (snapshot.empty) {
                  setHabits([]);
                  return setIsLoadingHabits(false);
               }
               snapshot.docChanges().forEach(({ type, doc }) => {
                  const change = {
                     id: doc.id,
                     ...(doc.data() as {}),
                  } as Habit;
                  switch (type) {
                     case 'added':
                        setHabits((prev) => [...prev, change]);
                        return setIsLoadingHabits(false);
                     case 'modified':
                        setHabits((prev) => {
                           let filtered = prev.filter(
                              (habit) => habit.id !== change.id
                           );
                           return [...filtered, change];
                        });
                        return setIsLoadingHabits(false);
                     case 'removed':
                        setHabits((prev) =>
                           prev.filter((habit) => habit.id !== change.id)
                        );
                        return setIsLoadingHabits(false);
                     default:
                        throw new Error(`type ${type} not found`);
                  }
               });
            }
         );
      }
   }, [user]);

   return (
      <Flex h="100vh" direction={['column', null, 'row']}>
         <Sidebar habits={habits} todayHabitTodos={todayHabitTodos} />
         <Header habits={habits} todayHabitTodos={todayHabitTodos} />
         <Box as="main" flex="1" overflowY="scroll" p={[2, 6, 8]} bg="gray.50">
            <Outlet context={appContext} />
         </Box>
      </Flex>
   );
}
