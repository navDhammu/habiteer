import { AbsoluteCenter, Container, Heading, Spinner } from '@chakra-ui/react';
import WorkInProgress from 'components/WorkInProgress';
import { useHabitsContext } from 'context/HabitsContext';

export default function Dashboard() {
   const { habits, isLoading } = useHabitsContext();
   console.log(habits);

   if (isLoading) return <Spinner />;

   return (
      <Container maxW="container.lg" position="relative" h="full">
         <Heading size="md">Dashboard</Heading>
         <AbsoluteCenter axis="both" textAlign="center">
            <WorkInProgress />
         </AbsoluteCenter>
      </Container>
   );
}
