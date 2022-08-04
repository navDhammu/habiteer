import { increment, onSnapshot, writeBatch } from '@firebase/firestore';
import {
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/outline';
import { addDays, format, isToday, isYesterday, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getDateDoc, getHabitDoc } from '../firebase/firestoreReferences';
import { toStringPercent } from '../utils';
import Button from './Button/Button';
import IconButton from './Button/IconButton';
import Checkbox from './Input/Checkbox';
import ProgressIndicator from './ProgressIndicator';

export default function HabitsTodos({ habits, className = '' }) {
	const [date, setDate] = useState(new Date());
	const [habitTodos, setHabitTodos] = useState([]);

	// const [sortBy, setSortBy] = useState('alphabet');

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
		return () => {
			console.log('cleaning up');
			unsub();
		};
	}, [date]);

	const handleHabitCheck = (id) => (e) => {
		let isComplete = e.target.checked;
		const habitDoc = getHabitDoc(id);
		const batch = writeBatch(db);

		batch.update(dateDoc, { [`${id}.isComplete`]: isComplete });
		batch.update(habitDoc, { completions: increment(isComplete ? 1 : -1) });
		batch.commit();
	};

	return (
		<section
			className={`sticky right-0 top-0 hidden h-screen w-1/4 flex-col gap-4 bg-neutral-100 px-7 pt-4 lg:flex ${className}`}>
			<header className='mb-4 items-center justify-between'>
				<div className='mt-2 flex justify-between gap-2'>
					<div>
						<h2 className='text-xl font-bold text-slate-700'>
							{isDateToday
								? 'Today'
								: isYesterday(date)
								? 'Yesterday'
								: format(date, 'MMM dd, yyyy')}
						</h2>
						<IconButton
							variant='outline'
							size='md'
							shape='rounded'
							Icon={ChevronLeftIcon}
							onClick={() => setDate(subDays(date, 1))}
						/>
						<IconButton
							variant='outline'
							size='md'
							shape='rounded'
							disabled={isDateToday}
							Icon={ChevronRightIcon}
							onClick={() => setDate(addDays(date, 1))}
						/>
					</div>
					<Button
						variant='text'
						size='sm'
						IconRight={ArrowRightIcon}
						invisible={isDateToday}
						onClick={() => setDate(new Date())}>
						Go To Today
					</Button>
				</div>
			</header>
			<div>
				<ProgressIndicator
					percent={toStringPercent(
						habitsComplete.length / habitTodos.length
					)}
				/>
				{/* <div className='relative h-3 rounded-full bg-neutral-200'>
					<div
						style={{
							width: `${
								(habitsComplete.length / habitTodos.length) *
								100
							}%`,
						}}
						className={`absolute h-full bg-amber-400 transition-all`}></div>
				</div> */}
				<span className='text-sm italic'>
					{habitsComplete.length} / {habitTodos.length} habits
					complete
				</span>
			</div>
			<div className='relative flex justify-between border-b-2 border-b-amber-500'>
				<h2 className='text-lg font-semibold capitalize text-amber-500'>
					{habitTodos.length} habits
				</h2>
				<div>
					<span className='text-gray-400'>sort by:</span>
					<select
						name=''
						id=''
						className='cursor-pointer bg-inherit font-semibold text-gray-800'>
						<option value=''>alphabet</option>
						<option value=''>completed</option>
					</select>
				</div>
			</div>
			{habitTodos.length === 0 ? (
				<div>no habits scheduled for this day</div>
			) : (
				<ul>
					{habitTodos
						.sort((a, b) => a.name < b.name && -1)
						.map((habit) => {
							return (
								<li
									key={habit.id}
									className='h-16 cursor-pointer rounded-lg pl-4 font-bold hover:bg-gray-100'>
									<Checkbox
										label={habit.name}
										checked={habit.isComplete}
										onChange={handleHabitCheck(habit.id)}
									/>
								</li>
							);
						})}
				</ul>
			)}
		</section>
	);
}
