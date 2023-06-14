import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
    AbsoluteCenter,
    Container,
    Heading,
    Spinner,
    Text,
} from '@chakra-ui/react'
import { useHabitsContext } from 'context/HabitsContext'

export default function Dashboard() {
    const { habits, isLoading } = useHabitsContext()
    console.log(habits)

    if (isLoading) return <Spinner />

    return (
        <Container maxW="container.lg" position="relative" h="full">
            <Heading size="md">Dashboard</Heading>
            <AbsoluteCenter axis="both" textAlign="center">
                <InfoOutlineIcon w="6" h="6" />
                <Text as="h2" fontSize="lg" fontWeight="bold">
                    Work In Progress
                </Text>
                <Text>
                    Content of this page is currently in development. Stay
                    Tuned!
                </Text>
            </AbsoluteCenter>
        </Container>
    )
}
