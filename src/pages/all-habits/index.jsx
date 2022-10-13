import { IconPlus } from '@tabler/icons';
import HabitCard from 'components/habits/HabitCard';
import Button from 'components/ui/Button';
import { ModalContext, MODAL_TYPES } from 'components/ui/GlobalModal';
import { useContext, useState } from 'react';
import { useOutletContext } from 'react-router';
import HabitDetails from '../../components/habits/HabitDetails';
import Heading from '../../components/ui/Heading';

export default function AllHabits() {
	const { handleShowModal } = useContext(ModalContext);
	const habits = useOutletContext();
	const [selectedHabitId, setSelectedHabitId] = useState(null);

	const selectedHabit = habits.find((habit) => habit.id === selectedHabitId);

	return (
		<main className='p-6'>
			<Heading size='lg'>All habits</Heading>
			<div className='flex gap-4 divide-x'>
				<section className='relative md:basis-1/2'>
					<header className='mb-4 flex justify-end'>
						<Button
							variant='primary'
							IconLeft={IconPlus}
							onClick={() =>
								handleShowModal(MODAL_TYPES.HABIT_FORM, {
									mode: 'CREATE',
								})
							}>
							Create New
						</Button>
					</header>
					<ul className=''>
						{habits.map((habit) => (
							<li
								key={habit.id}
								className='mb-4 rounded-md bg-white shadow-sm'>
								<HabitCard
									{...habit}
									onDetailsClick={() =>
										setSelectedHabitId(habit.id)
									}
								/>
							</li>
						))}
					</ul>
				</section>
				<HabitDetails
					habit={selectedHabit}
					onBackClick={() => setSelectedHabitId(null)}
				/>
			</div>
		</main>
	);
}
