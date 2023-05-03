import { Container, Heading, List, ListItem } from '@chakra-ui/react';
import { useAppContext } from 'hooks/useAppContext';
import HabitCard from './HabitCard';

export default function () {
   const { habits } = useAppContext();

   return (
      <Container>
         <Heading size="md" mb="4">
            All habits
         </Heading>
         <List display="flex" flexDirection="column" gap="4">
            {habits.map((habit) => (
               <ListItem key={habit.id}>
                  <HabitCard {...habit} />
               </ListItem>
            ))}
         </List>
      </Container>
   );
}
