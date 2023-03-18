import {
	List,
	ListItem,
	Heading,
	Container,
	Card,
	CardHeader,
	CardBody,
	Tag,
	Badge,
	Flex,
} from '@chakra-ui/react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import CreateOrEditHabit from 'components/CreateOrEditHabit';
import { Habit } from 'components/layout/AppLayout';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import HabitCard from './HabitCard';

export default function () {
	const habits: Habit[] = useOutletContext();
	const [isEditingHabit, setIsEditingHabit] = useState(false);

	return (
		<Container>
			<Heading size='md' mb='4'>
				All habits
			</Heading>
			<List display='flex' flexDirection='column' gap='4'>
				{habits.map((habit) => (
					<ListItem key={habit.id}>
						<HabitCard {...habit} />
					</ListItem>
				))}
			</List>
		</Container>
	);
}
