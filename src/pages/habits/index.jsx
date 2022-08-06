import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import Button from '../../components/Button/Button';
import HabitCard from '../../components/HabitCard';
import HabitForm from '../../components/HabitForm';
import Modal from '../../components/Modal';

export default function Habits({ habits }) {
	const [isOpenHabitModal, setIsOpenHabitModal] = useState(false);
	const closeHabitModal = () => setIsOpenHabitModal(false);

	console.log(habits);
	return (
		<main className='p-6 md:mx-auto md:w-3/4'>
			<h1 className='main-heading'>My Habits</h1>
			<section>
				<header className='mb-4 flex justify-end'>
					<Button variant='primary' IconLeft={IconPlus}>
						Create New
					</Button>
				</header>
				<ul className=''>
					{habits.map((habit) => (
						<li className='mb-4 rounded-md bg-white shadow-sm'>
							<HabitCard {...habit} />
						</li>
					))}
				</ul>
			</section>
			{isOpenHabitModal && (
				<Modal onClose={closeHabitModal}>
					<HabitForm onClose={closeHabitModal} />
				</Modal>
			)}
		</main>
	);
}
