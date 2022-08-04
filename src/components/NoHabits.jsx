import svg from '../assets/nodata.svg';
import useModal from '../hooks/useModal';
import Button from './Button/Button';
import HabitForm from './HabitForm';
import Modal from './Modal';

export default function NoHabits() {
	const { isModalOpen, handleOpen, handleClose } = useModal();

	return (
		<div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4'>
			<img src={svg} className='w-28' />
			<h2 className='text-xl'>Your habits list is empty</h2>
			<div className='text-gray-500'>
				Get started by creating your first habit
			</div>
			<Button size='sm' variant='primary' onClick={handleOpen}>
				Start
			</Button>
			{isModalOpen && (
				<Modal onClose={handleClose}>
					<HabitForm />
				</Modal>
			)}
		</div>
	);
}
