import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import IconButton from '../../components/Button/IconButton';
import HabitForm from '../../components/HabitForm';
import AlertDialogue from '../../components/Modals/AlertDialogue';
import Modal from '../../components/Modals/Modal';
import PopupMenu from '../../components/PopupMenu';
import { weekDaysArray } from '../../utils/days';

export function Week({ habits }) {
	return (
		<table>
			<tr className=''>
				<td></td>
				{weekDaysArray.map((day) => (
					<th className='font-normal capitalize'>
						{day.slice(0, 3)}
					</th>
				))}
			</tr>
			{habits.map((habit) => (
				<tr>
					<td className=''>
						<Habit habit={habit} />
					</td>
					{weekDaysArray.map((day) => (
						<td className='w-20'>
							<InputSquare day={day} />
						</td>
					))}
				</tr>
			))}
		</table>
	);
}

function InputSquare({ day }) {
	const [isChecked, setIsChecked] = useState(false);
	const handleChecked = (e) => {
		setIsChecked(e.target.checked);
	};
	return (
		<div
			className={`relative m-auto h-7 w-7 rounded border border-gray-400 ${
				isChecked ? 'bg-sky-400' : ''
			}`}>
			<label htmlFor={day} className='invisible h-12'>
				{day}
			</label>
			<input
				id={day}
				className='absolute left-0 top-0 h-full w-full cursor-pointer opacity-0'
				type='checkbox'
				checked={isChecked}
				onChange={handleChecked}
			/>
		</div>
	);
}

function Habit({ habit }) {
	const [showPopupMenu, setShowPopupMenu] = useState(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState(null);

	const handleMenuItemClick = (item) => {
		setShowPopupMenu(false);
		setSelectedMenuItem(item);
	};

	const handleCloseModal = () => setSelectedMenuItem(null);

	const handleHabitDelete = () => {
		// const habitDoc = getHabitDoc(habit.id);
		// const datesRef = datesCollection();
		// const q = query(datesRef, orderBy(`${habit.id}`));
		// getDocs(q).then((snapshot) => {
		// 	const batch = writeBatch(db);
		// 	snapshot.forEach((doc) => {
		// 		batch.update(getDateDoc(doc.id), { [habit.id]: deleteField() });
		// 	});
		// 	batch.delete(habitDoc);
		// 	batch.commit().then(handleCloseModal);
		// });
		// deleteDoc()
		// 	.then(handleCloseModal)
		// 	.catch((err) => console.log(err));
	};

	const getModal = () => {
		switch (selectedMenuItem) {
			case 'edit':
				return (
					<Modal onClose={handleCloseModal}>
						<HabitForm data={habit} />
					</Modal>
				);
			case 'archive':
				return (
					<AlertDialogue
						heading='Archive Habit'
						body='Are you sure you want to archive this habit'
						onCancel={handleCloseModal}
						confirmLabel='archive'
					/>
				);
			case 'delete':
				return (
					<AlertDialogue
						type='destructive'
						heading='Delete Habit'
						body='Are you sure you want to delete this habit'
						onCancel={handleCloseModal}
						onConfirm={handleHabitDelete}
						confirmLabel='delete'
					/>
				);
			default:
				return null;
		}
	};
	return (
		<div className='p-4'>
			<IconButton
				Icon={DotsVerticalIcon}
				size='md'
				onClick={() => setShowPopupMenu(true)}
			/>
			<h2 className='inline capitalize'>{habit.habitName}</h2>
			{showPopupMenu && (
				<PopupMenu
					items={['edit', 'archive', 'delete']}
					onItemClick={handleMenuItemClick}
					onOutsideClick={() => setShowPopupMenu(false)}
				/>
			)}
			{getModal()}
		</div>
	);
}
