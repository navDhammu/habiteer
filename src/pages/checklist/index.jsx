import { increment, onSnapshot, writeBatch } from '@firebase/firestore';
import {
	IconChevronLeft,
	IconChevronRight,
	IconChevronsRight,
	IconZoomExclamation,
} from '@tabler/icons';
import { addDays, format, isToday, isYesterday, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import IconButton from '../../components/Button/IconButton';
import ProgressIndicator from '../../components/ProgressIndicator';
import { db } from '../../firebase';
import { getDateDoc, getHabitDoc } from '../../firebase/firestoreReferences';
import { toStringPercent } from '../../utils';
import HabitTodoList from './HabitTodoList';

export default function Checklist() {
	const [date, setDate] = useState(new Date());
	const [habitTodos, setHabitTodos] = useState([]);

	const isDateToday = isToday(date);
	const habitsComplete = habitTodos.filter((habit) => habit.isComplete);

	const dateDoc = getDateDoc(date);

	useEffect(() => {
		const unsub = onSnapshot(
			getDateDoc(date),
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
	}, [date]);

	const handleCheckboxToggle = (id) => (e) => {
		let isComplete = e.target.checked;
		const habitDoc = getHabitDoc(id);
		const batch = writeBatch(db);

		batch.update(dateDoc, { [`${id}.isComplete`]: isComplete });
		batch.update(habitDoc, { completions: increment(isComplete ? 1 : -1) });
		batch.commit();
	};

	return (
		<main className='p-8 md:mx-auto md:w-3/4'>
			<h1 className='mb-6 text-2xl font-bold text-slate-800'>
				Habit Checklist
			</h1>
			<section className={`flex flex-col gap-4`}>
				<header className='w-full'>
					<div className='flex justify-between'>
						<h2 className='text-xl text-slate-800'>
							{isDateToday
								? 'Today'
								: isYesterday(date)
								? 'Yesterday'
								: format(date, 'MMM dd, yyyy')}
						</h2>
						<div className='space-x-2'>
							<IconButton
								variant='outline'
								size='md'
								Icon={IconChevronLeft}
								onClick={() => setDate(subDays(date, 1))}
							/>
							<IconButton
								variant='outline'
								size='md'
								disabled={isDateToday}
								Icon={IconChevronRight}
								onClick={() => setDate(addDays(date, 1))}
							/>
							<Button
								variant='text'
								size='sm'
								IconRight={IconChevronsRight}
								invisible={isDateToday}
								onClick={() => setDate(new Date())}>
								Today
							</Button>
						</div>
					</div>
					<div>
						<ProgressIndicator
							percent={toStringPercent(
								habitsComplete.length / habitTodos.length
							)}
						/>

						<span className='text-sm italic'>
							{habitsComplete.length} / {habitTodos.length} habits
							complete
						</span>
					</div>
				</header>
				{habitTodos.length > 0 ? (
					<HabitTodoList
						habits={habitTodos}
						heading='habit to dos'
						onCheckboxToggle={handleCheckboxToggle}
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
		</main>
	);
}
