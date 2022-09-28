import { useContext } from 'react';
import svg from '../assets/nodata.svg';
import { ModalContext, MODAL_TYPES } from '../Modals/GlobalModal';
import Button from './ui/Buttons/buttons/Button';

export default function NoHabits() {
	const { handleShowModal } = useContext(ModalContext);

	return (
		<div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4'>
			<img src={svg} className='w-28' />
			<h2 className='text-xl'>Your habits list is empty</h2>
			<div className='text-gray-500'>
				Get started by creating your first habit
			</div>
			<Button
				size='md'
				variant='primary'
				onClick={() => handleShowModal(MODAL_TYPES.HABIT_FORM)}>
				Create First Habit
			</Button>
		</div>
	);
}
