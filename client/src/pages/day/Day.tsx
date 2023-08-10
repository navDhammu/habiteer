import { Completion, HabitsService } from '@api';
import {
   AbsoluteCenter,
   Card,
   Container,
   Spinner,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import DateTab from './DateTab';
import DayHeader from './DayHeader';
import { HabitCompletions } from './HabitCompletions';

export default function Today() {
   const [date, setDate] = useState(dayjs());
   const [completions, setCompletions] = useState<Completion[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const dateString = date.format('YYYY-MM-DD');

   console.log(date);

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
      <Container display="flex" flexDirection="column" gap="4">
         <DayHeader date={date} onDateChange={(date) => setDate(date)} />
         <Tabs
            variant="unstyled"
            isLazy
            isFitted
            index={date.day()}
            onChange={(index) =>
               setDate(date.startOf('week').add(index, 'days'))
            }
         >
            <TabList as={Card} justifyContent="space-evenly">
               {Array.from({ length: 7 }, (_, i) => (
                  <DateTab key={i} date={date.startOf('week').add(i, 'days')} />
               ))}
            </TabList>
            <TabPanels mt={8}>
               {new Array(7).fill(null).map((_, i) => (
                  <TabPanel
                     className="panel"
                     key={i}
                     p="0"
                     mt="8"
                     position="relative"
                  >
                     {isLoading ? (
                        <AbsoluteCenter>
                           <Spinner />
                        </AbsoluteCenter>
                     ) : (
                        <HabitCompletions
                           completionsList={completions}
                           onCompletionStatusChange={
                              handleCompletionStatusChange
                           }
                        />
                     )}
                  </TabPanel>
               ))}
            </TabPanels>
         </Tabs>
      </Container>
   );
}
