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
	IconButton,
	HStack,
} from '@chakra-ui/react';
import { HabitTodos } from './HabitTodos';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addDays, isToday, isYesterday, subDays } from 'date-fns';

export type HabitTodo = {
	id: string;
	isComplete: boolean;
	name: string;
};

export default function Today() {
	const [date, setDate] = useState(new Date());
	const [habitTodos, setHabitTodos] = useState<HabitTodo[]>([]);

	const completedHabits = habitTodos.filter((habit) => habit.isComplete);
	const incompleteHabits = habitTodos.filter((habit) => !habit.isComplete);

	const isDateToday = isToday(date);
	const isDateYesterday = isYesterday(date);

	useEffect(() => {
		const unsub = onSnapshot(
			getDateDoc(date),
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
	}, [date]);

	return (
		<Container display='flex' flexDirection='column' gap='4'>
			<Box>
				<HStack>
					<Heading size='md'>
						{isDateToday
							? 'Today'
							: isDateYesterday
							? 'Yesterday'
							: date.toDateString()}
					</Heading>
					<IconButton
						bg='white'
						variant='outline'
						aria-label='previous'
						icon={<ChevronLeftIcon />}
						onClick={() => setDate(subDays(date, 1))}
					/>
					<IconButton
						bg='white'
						variant='outline'
						isDisabled={isDateToday}
						aria-label='next'
						icon={<ChevronRightIcon />}
						onClick={() => setDate(addDays(date, 1))}
					/>
				</HStack>
				<Text as='span' color='gray.400' size='sm'>
					{(isDateToday || isDateYesterday) && date.toDateString()}
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
