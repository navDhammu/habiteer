import { onSnapshot } from '@firebase/firestore';
import { IconZoomExclamation } from '@tabler/icons';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { getDateDoc } from 'services/firestoreReferences';
import { toStringPercent } from 'utils/misc';
import Heading from '../../components/ui/Heading';
import HabitDetails from './HabitDetails';
import HabitTodoList from './HabitTodoList';

export default function Today() {
	const [habitTodos, setHabitTodos] = useState([]);
	const [selectedHabitId, setSelectedHabitId] = useState(null);
	const habits = useOutletContext();

	const completedHabits = habitTodos.filter((habit) => habit.isComplete);
	const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

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
					{habitTodos.length > 0 ? (
						<HabitTodoList
							habitTodos={habitTodos}
							onTodoClick={(id) => setSelectedHabitId(id)}
						/>
					) : (
						<div className='mt-8 flex flex-col items-center gap-4'>
							<IconZoomExclamation
								className='rounded-full bg-slate-200 p-2 text-slate-500'
								size='48px'
							/>
							<p>No habits found for this day</p>
						</div>
					)}
				</section>
				<HabitDetails
					habit={selectedHabit}
					onBackClick={() => setSelectedHabitId(null)}
				/>
			</div>
		</main>
	);
}
