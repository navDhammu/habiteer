import { onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { getDateDoc } from 'services/firestoreReferences';
import { toStringPercent } from 'utils/misc';
import {
	Heading,
	Container,
	Text,
	Card,
	CardBody,
	Box,
} from '@chakra-ui/react';
import { HabitTodos } from './HabitTodos';

export type HabitTodo = {
	id: string;
	isComplete: boolean;
	name: string;
};

export default function Today() {
	const [habitTodos, setHabitTodos] = useState<HabitTodo[]>([]);
	const completedHabits = habitTodos.filter((habit) => habit.isComplete);
	const incompleteHabits = habitTodos.filter((habit) => !habit.isComplete);

	useEffect(() => {
		const unsub = onSnapshot(
			getDateDoc(new Date()),
			(doc) => {
				if (doc.exists()) {
					const { date, ...habits } = doc.data();
					setHabitTodos(
						Object.entries(habits).map(([id, habit]) => ({
							id,
							...(habit as Omit<HabitTodo, 'id'>),
						}))
					);
				} else {
					setHabitTodos([]);
				}
			},
			(error) => console.log(error)
		);
		return unsub;
	}, []);

	return (
		<Container display='flex' flexDirection='column' gap='4'>
			<Box>
				<Heading size='md'>Today</Heading>
				<Text as='span' color='gray.400' size='sm'>
					{new Date().toDateString()}
				</Text>
			</Box>
			<Text as='span' className='text-sm italic'>
				{completedHabits.length} / {habitTodos.length} habits complete
			</Text>
			<HabitTodos todos={incompleteHabits} heading='To do' />
			<HabitTodos todos={completedHabits} heading='Completed' />
		</Container>
	);
}
