import { IconArchive, IconPencil, IconTrash } from '@tabler/icons';
import { eachDayOfInterval, getDay, isFuture, parse } from 'date-fns';
import { useContext } from 'react';
import { deleteHabit } from '../firebase/dbOperations';
import { toStringPercent } from '../utils';
import Button from './Button/Button';
import { ModalContext, MODAL_TYPES } from './Modals/GlobalModal';
import ProgressIndicator from './ProgressIndicator';

function getHabitCompletionRate({
	trackingStartDate,
	completions,
	repeatDays,
}) {
	const totalDays = eachDayOfInterval({
		start: parse(trackingStartDate, 'yyyy-MM-dd', new Date()),
		end: new Date(),
	}).filter((date) =>
		repeatDays.some((day) => {
			console.log(day);
			return day.id === getDay(date);
		})
	).length;
	console.log(totalDays);
	return completions / totalDays;
}

export default function HabitCard(props) {
	const { handleShowModal, handleHideModal } = useContext(ModalContext);
	const trackingStartDate = parse(
		props.trackingStartDate,
		'yyyy-MM-dd',
		new Date()
	);

	const completionRate = isFuture(trackingStartDate)
		? null
		: getHabitCompletionRate(props);

	const handleEditClick = () =>
		handleShowModal(MODAL_TYPES.HABIT_FORM, {
			initialValues: props,
			mode: 'EDIT',
		});
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
