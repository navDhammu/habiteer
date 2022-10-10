import { onSnapshot } from '@firebase/firestore';
import HabitDetails from 'components/habits/HabitDetails';
import HabitTodoList from 'components/habits/HabitTodoList';
import Heading from 'components/ui/Heading';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { getDateDoc } from 'services/firestoreReferences';
import { toStringPercent } from 'utils/misc';

export default function Today() {
	const [habitTodos, setHabitTodos] = useState([]);
	const [selectedHabitId, setSelectedHabitId] = useState(null);
	const habits = useOutletContext();

	const completedHabits = habitTodos.filter((habit) => habit.isComplete);
	const incompleteHabits = habitTodos.filter((habit) => !habit.isComplete);
	const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

	const handleHabitDetailsClick = (id) => setSelectedHabitId(id);

	useEffect(() => {
		const unsub = onSnapshot(
			getDateDoc(new Date()),
			(doc) => {
				if (doc.exists()) {
					setHabitTodos(
						Object.entries(doc.data()).map(([id, habit]) => ({
							id,
							...habit,
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
		<main className='relative p-8 md:p-6'>
			<Heading size='lg'>Today</Heading>
			<span className='text-sm text-gray-500'>
				{new Date().toDateString()}
			</span>
			<div className='flex gap-4 divide-x'>
				<section className='flex basis-full flex-col gap-4 sm:basis-1/2'>
					<header className='my-4 w-full'>
						<ProgressIndicator
							percent={toStringPercent(
								completedHabits.length / habitTodos.length
							)}
						/>
						<span className='text-sm italic'>
							{completedHabits.length} / {habitTodos.length}{' '}
							habits complete
						</span>
					</header>
					<Heading size='sm'>To do</Heading>
					<HabitTodoList
						habitTodos={incompleteHabits}
						onDetailsClick={handleHabitDetailsClick}
					/>
					<Heading size='sm'>Completed</Heading>
					<HabitTodoList
						habitTodos={completedHabits}
						onDetailsClick={handleHabitDetailsClick}
					/>
				</section>
				<HabitDetails
					habit={selectedHabit}
					onBackClick={() => setSelectedHabitId(null)}
				/>
			</div>
		</main>
	);
}
