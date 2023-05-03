import {
   Box,
   Button,
   Card,
   Container,
   TabList,
   TabPanel,
   TabPanels,
   TabProps,
   Tabs,
   useMultiStyleConfig,
   useTab,
} from '@chakra-ui/react';
import { addDays, isAfter, isToday, startOfWeek } from 'date-fns';
import useHabitTodos from 'hooks/useHabitTodos';
import { forwardRef, useState } from 'react';
import { getDayOfWeek, getWeekArray } from 'utils/dates';
import { HabitTodos } from './HabitTodos';
import Header from './Header';

export type HabitTodo = {
   id: string;
   isComplete: boolean;
   name: string;
};

export default function Today() {
   const [date, setDate] = useState(new Date());
   const [habitTodos, handleCheckHabit] = useHabitTodos(date);

   return (
      <Container display="flex" flexDirection="column" gap="4">
         <Header date={date} onDateChange={(date) => setDate(date)} />
         <Tabs
            variant="unstyled"
            isLazy
            isFitted
            index={date.getDay()}
            onChange={(index) => setDate(addDays(startOfWeek(date), index))}
         >
            <TabList as={Card} justifyContent="space-evenly">
               {getWeekArray(date).map((value, index) => (
                  <DateTab
                     key={index}
                     date={value}
                     isDisabled={isAfter(value, new Date())}
                     color={isToday(value) ? 'green.400' : 'black'}
                  />
               ))}
            </TabList>
            <TabPanels>
               {new Array(7).fill(null).map((v, i) => (
                  <TabPanel className="panel" key={i} p="0" mt="8">
                     <HabitTodos
                        todos={habitTodos}
                        heading="Habit Checklist"
                        onCheckHabit={handleCheckHabit}
                     />
                  </TabPanel>
               ))}
            </TabPanels>
         </Tabs>
      </Container>
   );
}

// custom tab component
const DateTab = forwardRef<HTMLButtonElement, TabProps & { date: Date }>(
   (props, ref) => {
      const tabProps = useTab({ ...props, ref });
      const isSelected = !!tabProps['aria-selected'];
      const styles = useMultiStyleConfig('Tabs', tabProps);

      return (
         <Button
            __css={styles.tab}
            {...tabProps}
            border="none"
            display="flex"
            flexDirection="column"
            alignItems="center"
            isDisabled={props.isDisabled}
         >
            <Box as="span" color="gray.500">
               {getDayOfWeek(props.date)[0]}
            </Box>

            {isSelected ? (
               <Box
                  as="span"
                  bg="green.400"
                  borderRadius="full"
                  color="white"
                  w="8"
                  h="8"
                  lineHeight="8"
               >
                  {props.date.getDate()}
               </Box>
            ) : (
               <Box fontWeight="bold">{props.date.getDate()}</Box>
            )}
         </Button>
      );
   }
);
