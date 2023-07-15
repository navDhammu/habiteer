import { useHabitsContext } from 'context/HabitsContext';
import HabitCard from './HabitCard';
import { Flex, Heading } from '@chakra-ui/react';

export default function AllHabitsPage() {
   const { habits } = useHabitsContext();

   return (
      <Flex direction="column" gap="6" maxW="2xl" mx="auto">
         <Heading size="lg">All Habits</Heading>
         {habits.map((habit) => (
            <HabitCard {...habit} />
         ))}
      </Flex>
   );
}
