import { onSnapshot } from '@firebase/firestore';
import HabitTodoList from 'components/habits/HabitTodoList';
import Heading from 'components/ui/Heading';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import { useEffect, useState } from 'react';
import { getDateDoc } from 'services/firestoreReferences';
import { toStringPercent } from 'utils/misc';

export default function HabitTodos() {
    const [habitTodos, setHabitTodos] = useState([]);

	const completedHabits = habitTodos.filter((habit) => habit.isComplete);
	const incompleteHabits = habitTodos.filter((habit) => !habit.isComplete);

	// const handleHabitDetailsClick = (id) => setSelectedHabitId(id);

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
        <section className='flex flex-col gap-4'>
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
						// onDetailsClick={handleHabitDetailsClick}
					/>
					<Heading size='sm'>Completed</Heading>
					<HabitTodoList
						habitTodos={completedHabits}
						// onDetailsClick={handleHabitDetailsClick}
					/>
				</section>
    )
}
