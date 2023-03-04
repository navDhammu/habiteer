import { Navigate } from "react-router";
import LoginForm from "./LoginForm";
import {
  Box,
  Heading,
  Container,
  Center,
  Text,
  Icon,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { IconSeeding } from "@tabler/icons";
import TestUser from "./TestUser";

export default function Login({ user }) {
  if (user) return <Navigate to="/dashboard" />;

  return (
    <Center h="100vh">
      <Container>
        <VStack mb="4">
          <HStack>
            <Icon as={IconSeeding} color="green.300" w="12" h="12" />
            <Text fontSize="3xl" fontWeight="bold">
              Habiteer
            </Text>
          </HStack>
          <Heading size="md">Login to your account</Heading>
          <Box as="figure" textAlign="right" borderRadius="lg">
            <Text as="q" fontStyle="italic">
              Motivation is what gets you started. Habit is what keeps you
              going.
            </Text>
            <Text as="figcaption">&mdash; Jim Ryun</Text>
          </Box>
        </VStack>
        <LoginForm />
        <TestUser />
      </Container>
    </Center>
  );
}
