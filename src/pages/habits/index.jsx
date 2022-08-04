import { useState } from 'react';
import HabitForm from '../../components/HabitForm';
import HabitsList from '../../components/HabitsList';
import Modal from '../../components/Modal';

export default function Habits({ habits }) {
	const [isOpenHabitModal, setIsOpenHabitModal] = useState(false);
	const closeHabitModal = () => setIsOpenHabitModal(false);
	return (
		<div>
			<HabitsList
				habits={habits}
				onCreateBtnClick={() => setIsOpenHabitModal(true)}
			/>
			{isOpenHabitModal && (
				<Modal onClose={closeHabitModal}>
					<HabitForm onClose={closeHabitModal} />
				</Modal>
			)}
		</div>
	);
}
