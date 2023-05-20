import { Box, Flex } from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { Habit } from 'types/Habit'
import Header from './Header'
import Sidebar from './sidebar'

const today = new Date()

export default function AppLayout({ view }: { view: ReactElement }) {
    const [habits, setHabits] = useState<Habit[]>([])

    return (
        <Flex h="100vh" direction={['column', null, 'row']}>
            <Sidebar habits={habits} todayHabitTodos={[]} />
            <Header habits={habits} todayHabitTodos={[]} />
            <Box
                as="main"
                flex="1"
                overflowY="scroll"
                p={[2, 6, 8]}
                bg="gray.50"
            >
                {view}
            </Box>
        </Flex>
    )
}
