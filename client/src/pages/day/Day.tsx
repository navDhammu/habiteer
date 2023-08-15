import { Completion, HabitsService } from '@api';
import { Container, Skeleton, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Calendar from './Calendar';
import Chart from './Chart';
import DayHeader from './DayHeader';
import { HabitCompletions } from './HabitCompletions';

export default function Today() {
   const [date, setDate] = useState(dayjs());
   const [completions, setCompletions] = useState<Completion[]>([]);
   const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      HabitsService.getCompletions(dateString, dateString)
         .then((result) => setCompletions(result))
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }, [date]);

   return (
      <Container
         maxW="6xl"
         display="flex"
         flexDir={{ base: 'column', xl: 'row' }}
         gap="8"
      >
         <VStack align="left" w={{ base: 'full', xl: '50%' }}>
            <DayHeader date={date} onDateChange={(date) => setDate(date)} />
            <Skeleton isLoaded={!isLoading}>
               <HabitCompletions
                  completionsList={completions}
                  onCompletionStatusChange={handleCompletionStatusChange}
               />
            </Skeleton>
         </VStack>
         <VStack>
            <Calendar
               date={date.toDate()}
               selected={date.toDate()}
               onJumpToToday={() => setDate(dayjs())}
               onDateSelected={(date) => setDate(dayjs(date.date))}
            />
            <Chart />
         </VStack>
      </Container>
   );
}
