import { IconDotsVertical } from '@tabler/icons';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../ui/Card';
import { ModalContext, MODAL_TYPES } from '../ui/GlobalModal';
import IconButton from '../ui/IconButton';
import Popover from '../ui/Popover';

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
		<Card as='article' className='py-4 px-6'>
			<header className='flex items-center'>
				<div className='flex-1'>
					<h2>
						<strong className='text-lg capitalize text-slate-700'>
							{props.habitName}
						</strong>
					</h2>
					<h3 className='text-sm text-gray-400'>
						{props.habitDescription}
					</h3>
				</div>
				<Popover>
					<Popover.Button>
						<IconButton
							className='mr-2'
							size='sm'
							Icon={IconDotsVertical}
						/>
					</Popover.Button>
					<Popover.Content>
						<ul className='[&>*:hover]:bg-stone-100 [&>*]:cursor-pointer flex flex-col text-sm'>
							<li className=''>
								<button
									className='w-full p-2 text-left'
									onClick={handleEditClick}>
									Edit
								</button>
							</li>
							<li className='w-full p-2 text-left'>
								<NavLink className='block' to={`/all-habits/${props.id}`}>details</NavLink>
							</li>
						</ul>
					</Popover.Content>
				</Popover>
			</header>
		</Card>
	);
}
