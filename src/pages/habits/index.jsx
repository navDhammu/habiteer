import { IconPlus } from '@tabler/icons';
import { useContext } from 'react';
import Button from '../../components/Button/Button';
import HabitCard from '../../components/HabitCard';
import { ModalContext, MODAL_TYPES } from '../../components/Modals/GlobalModal';

export default function Habits({ habits }) {
	const { handleShowModal } = useContext(ModalContext);
	return (
		<main className='p-6 md:mx-auto md:w-3/4'>
			<h1 className='main-heading'>My Habits</h1>
			<section>
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
							<HabitCard {...habit} />
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
