import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import HabitForm from '../habits/HabitCreateEditForm';
import AlertDialogue from './AlertDialogue';
import Modal from './Modal';

export const ModalContext = createContext();
export const MODAL_TYPES = {
	DELETE_HABIT: 'DELETE_HABIT',
	HABIT_FORM: 'HABIT_FORM',
	ARCHIVE_HABIT: 'ARCHIVE_HABIT',
};

const MODAL_COMPONENTS = {
	[MODAL_TYPES.HABIT_FORM]: (props) => (
		<Modal title={props.mode === 'CREATE' ? 'create habit' : 'edit habit'}>
			<HabitForm {...props} />
		</Modal>
	),
	[MODAL_TYPES.DELETE_HABIT]: (props) => (
		<Modal title='Delete Habit'>
			<AlertDialogue
				variant='danger'
				body={`Are you sure you want to delete "${props.habitName}"`}
				onCancel={props.onClose}
				onConfirm={props.onConfirm}
				confirmBtnLabel='Delete'
			/>
		</Modal>
	),
	[MODAL_TYPES.ARCHIVE_HABIT]: (props) => (
		<Modal title='Archive Habit'>
			<AlertDialogue
				variant='info'
				body={`Are you sure you want to archive "${props.habitName}"`}
				onConfirm={props.onConfirm}
				onCancel={props.onClose}
				confirmBtnLabel='Archive'
			/>
		</Modal>
	),
};

export default function GlobalModal({ children }) {
	const [modal, setModal] = useState({});
	const route = useLocation();

	const handleShowModal = (type, props) => setModal({ type, props });
	const handleHideModal = () => setModal({});

	//hide modal if route changes and modal is open
	useEffect(() => {
		if (modal.type) handleHideModal();
	}, [route]);

	const ModalComponent = MODAL_COMPONENTS[modal.type];

	return (
		<ModalContext.Provider
			value={{ modal, handleShowModal, handleHideModal }}>
			{ModalComponent && (
				<ModalComponent {...modal.props} onClose={handleHideModal} />
			)}
			{children}
		</ModalContext.Provider>
	);
}
