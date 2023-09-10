import { Completion, HabitsService } from '@api';
import {
   Box,
   Container,
   Heading,
   Spinner,
   Text,
   VStack,
} from '@chakra-ui/react';
import EmptyState from 'components/EmptyState';
import { useHabitsContext } from 'context/HabitsContext';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Completions from './Completions';

export default function Today() {
   const [date, setDate] = useState(dayjs());
   const { habits } = useHabitsContext();
   const [completions, setCompletions] = useState<Completion[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const dateString = date.format('YYYY-MM-DD');

   const handleCompletionStatusChange = (updatedCompletion: Completion) =>
      setCompletions(
         completions.map((completion) =>
            completion.id === updatedCompletion.id
               ? updatedCompletion
               : completion
         )
      );

   useEffect(() => {
      HabitsService.getCompletions(dateString, dateString)
         .then((result) => setCompletions(result))
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }, [date]);

   return (
      <Container maxW="6xl" gap="8">
         <Box mb="6">
            <Heading>Welcome back Test User</Heading>
            <Text>Today is {dayjs().format('ddd MMM MM, YYYY')}</Text>
         </Box>
         {isLoading ? (
            <Spinner />
         ) : !habits.length ? (
            <EmptyState />
         ) : (
            <VStack align="left" w={{ base: 'full', xl: '50%' }} mx="auto">
               <Completions
                  date={date}
                  onDateChange={(d) => setDate(d)}
                  completionsList={completions}
                  onCompletionStatusChange={handleCompletionStatusChange}
               />
            </VStack>
         )}
      </Container>
   );
}
