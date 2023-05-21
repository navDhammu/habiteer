import {
    Box,
    Center,
    Container,
    Heading,
    HStack,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react'
import { IconSeeding } from '@tabler/icons-react'
import LoginForm from './LoginForm'
import TestUser from './TestUser'

export default function LoginPage() {
    //     if (user) return <Navigate to="/dashboard" />

    return (
        <Center h="100vh">
            <Container>
                <VStack mb="4">
                    <HStack>
                        <Icon
                            as={IconSeeding}
                            color="green.300"
                            w="12"
                            h="12"
                        />
                        <Text fontSize="3xl" fontWeight="bold">
                            Habiteer
                        </Text>
                    </HStack>
                    <Heading size="md">Login to your account</Heading>
                    <Box as="figure" textAlign="right" borderRadius="lg">
                        <Text as="q" fontStyle="italic">
                            Motivation is what gets you started. Habit is what
                            keeps you going.
                        </Text>
                        <Text as="figcaption">&mdash; Jim Ryun</Text>
                    </Box>
                </VStack>
                <LoginForm />
                <TestUser />
            </Container>
        </Center>
    )
}
