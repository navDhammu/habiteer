import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { Divider, Text, Center, Button, Flex } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { auth } from "services";

export default function TestUser() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    signInWithEmailAndPassword(auth, "test@test.com", "test1234").then(() =>
      setIsLoggingIn(false)
    );
  };
  return (
    <>
      {" "}
      <Flex align="center">
        <Divider />
        <Text padding="2">OR</Text>
        <Divider />
      </Flex>
      <Center>
        <Button
          isLoading={isLoggingIn}
          marginX="auto"
          colorScheme="green"
          variant="outline"
          rightIcon={<ArrowRightIcon />}
          onClick={handleLogin}
        >
          Continue as test user
        </Button>
      </Center>
    </>
  );
}
