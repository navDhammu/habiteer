import { IconArrowRight, IconPlus } from '@tabler/icons';
import { eachDayOfInterval, getDay, parse } from 'date-fns';
import { NavLink } from 'react-router-dom';
import Button from './Button/Button';
import HabitCard from './HabitCard';
import CardLayout from './Layout/CardLayout';

function getHabitCompletionRate({
	trackingStartDate,
	completions,
	repeatDays,
}) {
	const totalDays = eachDayOfInterval({
		start: parse(trackingStartDate, 'yyyy-MM-dd', new Date()),
		end: new Date(),
	}).filter((date) => repeatDays.includes(getDay(date))).length;
	return completions / totalDays;
}

export default function HabitsList({ habits, onOpenModal, asTopHabits }) {
	const handleCreateClick = (e) => {
		e.stopPropagation();
		onOpenModal();
	};
	const handleEditClick = (id) => (e) => {
		e.stopPropagation();
		onOpenModal(id);
	};

	habits.forEach(
		(habit) => (habit.completionRate = getHabitCompletionRate(habit))
	);

	const displayedHabits = asTopHabits
		? habits.sort((a, b) => b.completionRate - a.completionRate).slice(0, 3)
		: habits;
	return (
		<CardLayout>
			<header className='flex border-b border-gray-100 py-4'>
				<h2 className='flex-1 text-lg font-semibold text-slate-600'>
					{asTopHabits ? 'Top Habits' : 'My habits'}
				</h2>
				<div className='flex items-center gap-4'>
					{!asTopHabits && (
						<Button
							variant='primary'
							size='sm'
							IconLeft={IconPlus}
							onClick={handleCreateClick}>
							Create new
						</Button>
					)}
				</div>
			</header>
			<ul className='flex list-none flex-col gap-8 py-4'>
				{displayedHabits.map((habit) => (
					<li key={habit.id} className=''>
						<HabitCard
							completionRate={habit.completionRate}
							habitName={habit.habitName}
							habitDescription={habit.habitDescription}
							habitCategory={habit.habitCategory}
							onEditClick={handleEditClick(habit.id)}
						/>
					</li>
				))}
			</ul>

			{asTopHabits && (
				<div className='my-4 text-center'>
					<NavLink
						to='/allhabits'
						className='text-sm text-indigo-500'>
						<span>View All Habits</span>
						<IconArrowRight className='ml-2 inline w-4' />
					</NavLink>
				</div>
			)}
		</CardLayout>
	);
}
