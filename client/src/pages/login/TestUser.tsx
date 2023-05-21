import { ArrowRightIcon } from '@chakra-ui/icons'
import { Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function TestUser() {
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    return (
        <>
            {' '}
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
                    // onClick={handleLogin}
                >
                    Continue as test user
                </Button>
            </Center>
        </>
    )
}
