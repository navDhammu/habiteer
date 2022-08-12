import { IconArchive, IconPencil, IconTrash } from '@tabler/icons';
import { useContext } from 'react';
import { deleteHabit } from '../firebase/dbOperations';
import { toStringPercent } from '../utils';
import { getHabitCompletionRate } from '../utils/habits';
import Button from './Button/Button';
import { ModalContext, MODAL_TYPES } from './Modals/GlobalModal';
import ProgressIndicator from './ProgressIndicator';

export default function HabitCard(props) {
	const { handleShowModal, handleHideModal } = useContext(ModalContext);
	const completionRate = getHabitCompletionRate(props);

	const handleEditClick = () =>
		handleShowModal(MODAL_TYPES.HABIT_FORM, { data: props });
	const handleArchiveClick = () =>
		handleShowModal(MODAL_TYPES.ARCHIVE_HABIT, {
			habitName: props.habitName,
		});
	const handleDeleteClick = () =>
		handleShowModal(MODAL_TYPES.DELETE_HABIT, {
			habitName: props.habitName,
			onConfirm: () => deleteHabit(props.id).then(handleHideModal),
		});

	return (
		<article className='py-4 px-6'>
			<header className='flex items-center'>
				<div className='flex-1'>
					<h2>
						<strong className='text-lg capitalize text-slate-700'>
							{props.habitName}
						</strong>
						{/* <span className='ml-2 rounded-2xl border border-sky-400 bg-sky-100 px-2 py-1 text-sm capitalize'>
							{habitCategory}
						</span> */}
					</h2>

					<h3 className='text-sm text-gray-400'>
						{props.habitDescription}
					</h3>
				</div>

				<Button
					className='mr-2'
					variant='tertiary'
					size='sm'
					onClick={handleEditClick}
					IconLeft={IconPencil}>
					Edit
				</Button>

				<Button
					className='mr-2'
					variant='tertiary'
					size='sm'
					onClick={handleArchiveClick}
					IconLeft={IconArchive}>
					Archive
				</Button>
				<Button
					className='mr-2'
					variant='tertiary'
					size='sm'
					onClick={handleDeleteClick}
					IconLeft={IconTrash}>
					Delete
				</Button>
			</header>
			<section className='my-4'>
				<div className='flex justify-between'>
					<h3 className='text-sm capitalize text-gray-500'>
						completion rate
					</h3>
					<span>{Math.round(completionRate * 100)} %</span>
				</div>
				<ProgressIndicator percent={toStringPercent(completionRate)} />
			</section>
		</article>
	);
}
