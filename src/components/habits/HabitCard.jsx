import { IconArrowRight, IconEdit, IconTag, IconTrash } from '@tabler/icons';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../ui/Card';
import { ModalContext, MODAL_TYPES } from '../ui/GlobalModal';
import IconButton from '../ui/IconButton';

// function getHabitCompletionRate({
// 	trackingStartDate,
// 	completions,
// 	repeatDays,
// }) {
// 	const totalDays = eachDayOfInterval({
// 		start: parse(trackingStartDate, 'yyyy-MM-dd', new Date()),
// 		end: new Date(),
// 	}).filter((date) =>
// 		repeatDays.some((day) => {
// 			return day.id === getDay(date);
// 		})
// 	).length;
// 	return completions / totalDays;
// }

export default function HabitCard(props) {
	const { handleShowModal } = useContext(ModalContext);

	const handleEditClick = () =>
		handleShowModal(MODAL_TYPES.HABIT_FORM, {
			initialValues: props,
			mode: 'EDIT',
		});

	return (
		<Card as='article' className='py-3 px-5'>
			<header>
				<h1 className='first-letter:capitalize font-semibold text-slate-700'>
					{props.habitName}
				</h1>

			</header>
			<span className='text-sm text-gray-400 flex items-center gap-1'>
				<IconTag className='w-4'/>
				{props.habitCategory}
			</span>
			<i className='text-sm first-letter:capitalize'>{props.habitDescription}</i>
			<hr className='my-2'/>
			<footer className='flex items-center justify-between'>
				<div>
					<IconButton size='sm' Icon={IconEdit} onClick={handleEditClick}/>
					<IconButton size='sm' Icon={IconTrash}/>
				</div>
				<NavLink to={`/all-habits/${props.id}`} className='text-indigo-500 text-sm flex items-center font'>
					Details
					<IconArrowRight className='w-4 ml-2'/>
				</NavLink>
			</footer>
		</Card>
	);
}
