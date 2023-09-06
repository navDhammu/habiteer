import { Completion, HabitsService } from '@api';
import {
   Box,
   Container,
   Heading,
   Skeleton,
   Text,
   VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Completions from './Completions';

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
      <Container maxW="6xl" gap="8">
         <Box mb="6">
            <Heading>Welcome back Test User</Heading>
            <Text>Today is {dayjs().format('ddd MMM MM, YYYY')}</Text>
         </Box>
         <VStack align="left" w={{ base: 'full', xl: '50%' }} mx="auto">
            <Skeleton isLoaded={!isLoading}>
               <Completions
                  date={date}
                  onDateChange={(d) => setDate(d)}
                  completionsList={completions}
                  onCompletionStatusChange={handleCompletionStatusChange}
               />
            </Skeleton>
         </VStack>
      </Container>
   );
}
