import {
   ArrowRightIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
} from '@chakra-ui/icons';
import {
   Box,
   Button,
   Card,
   Container,
   Flex,
   HStack,
   IconButton,
   TabList,
   TabPanel,
   TabPanels,
   TabProps,
   Tabs,
   Text,
   useMultiStyleConfig,
   useTab,
} from '@chakra-ui/react';
import {
   addDays,
   isAfter,
   isToday,
   isYesterday,
   startOfWeek,
   subDays,
} from 'date-fns';
import useHabitTodos from 'hooks/useHabitTodos';
import { forwardRef, useState } from 'react';
import { getDayOfWeek, getWeekArray } from 'utils/dates';
import { HabitTodos } from './HabitTodos';

export type HabitTodo = {
   id: string;
   isComplete: boolean;
   name: string;
};

export default function Today() {
   const [date, setDate] = useState(new Date());
   const [habitTodos, handleCheckHabit] = useHabitTodos(date);

   const completedHabits = habitTodos.filter((habit) => habit.isComplete);
   const isDateToday = isToday(date);
   const isDateYesterday = isYesterday(date);

   return (
      <Container display="flex" flexDirection="column" gap="4">
         <Box>
            {/* <HStack> */}
            <Flex justifyContent="space-between">
               <Box>
                  <Text
                     textTransform="uppercase"
                     color="gray.500"
                     fontWeight="bold"
                     fontSize="sm"
                  >
                     {isDateToday
                        ? 'Today'
                        : isDateYesterday
                        ? 'Yesterday'
                        : null}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                     {date.toDateString()}
                  </Text>
               </Box>
               <HStack justifyContent="end">
                  {!isDateToday && (
                     <Button
                        onClick={() => setDate(new Date())}
                        rightIcon={<ArrowRightIcon boxSize="3" />}
                     >
                        Today
                     </Button>
                  )}
                  <IconButton
                     variant="ghost"
                     aria-label="previous"
                     icon={<ChevronLeftIcon boxSize="7" />}
                     onClick={() => setDate(subDays(date, 1))}
                  />
                  <IconButton
                     variant="ghost"
                     isDisabled={isDateToday}
                     aria-label="next"
                     icon={<ChevronRightIcon boxSize="7" />}
                     onClick={() => setDate(addDays(date, 1))}
                  />
               </HStack>
            </Flex>
            {/* </HStack> */}
         </Box>
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
                     {/* <Text className="text-sm italic" my="4">
                        {completedHabits.length} / {habitTodos.length} habits
                        complete
                     </Text> */}
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
