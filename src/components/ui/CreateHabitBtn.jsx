import { IconPlus } from '@tabler/icons';
import { useContext } from 'react';
import Button from './Button';
import { ModalContext, MODAL_TYPES } from './GlobalModal';

export default function CreateHabitBtn({ variant = 'primary' }) {
	const { handleShowModal } = useContext(ModalContext);

	return (
		<Button
			// className={`mt-4 ${isMobile ? 'w-48' : ''}`}
			variant={variant}
			size='md'
			IconLeft={IconPlus}
			onClick={() =>
				handleShowModal(MODAL_TYPES.HABIT_FORM, {
					mode: 'CREATE',
				})
			}>
			Create Habit
		</Button>
	);
}
