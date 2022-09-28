import { IconPlus } from '@tabler/icons';
import { useContext } from 'react';
import Button from './Button';
import { ModalContext, MODAL_TYPES } from './GlobalModal';

export default function CreateHabitBtn() {
	const { handleShowModal } = useContext(ModalContext);

	return (
		<Button
			// className={`mt-4 ${isMobile ? 'w-48' : ''}`}
			variant='secondary'
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
