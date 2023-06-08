import { InfoOutlineIcon } from '@chakra-ui/icons';
import { AbsoluteCenter, Container, Heading, Text } from '@chakra-ui/react';

export default function Dashboard() {

   return (
      <Container maxW="container.lg" position="relative" h="full">
         <Heading size="md">Dashboard</Heading>
         <AbsoluteCenter axis="both" textAlign="center">
            <InfoOutlineIcon w="6" h="6" />
            <Text as="h2" fontSize="lg" fontWeight="bold">
               Work In Progress
            </Text>
            <Text>
               Content of this page is currently in development. Stay Tuned!
            </Text>
         </AbsoluteCenter>
      </Container>
   );
}
