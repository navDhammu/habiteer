import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import HabitForm from '../HabitForm';
import Sidebar from '../Layout/Sidebar';
import AlertDialogue from './AlertDialogue';
import Modal from './Modal';

export const ModalContext = createContext();
export const MODAL_TYPES = {
	DELETE_HABIT: 'DELETE_HABIT',
	HABIT_FORM: 'HABIT_FORM',
	ARCHIVE_HABIT: 'ARCHIVE_HABIT',
	SIDEBAR: 'SIDEBAR',
};

const DIALOGUE_COMPONENTS = {
	[MODAL_TYPES.HABIT_FORM]: HabitForm,
	[MODAL_TYPES.SIDEBAR]: Sidebar,
	[MODAL_TYPES.DELETE_HABIT]: ({ habitName, onClose }) => (
		<AlertDialogue
			variant='danger'
			heading='Delete Habit'
			body={`Are you sure you want to delete ${habitName}`}
			onClose={onClose}
			confirmButton='Delete'
		/>
	),
	[MODAL_TYPES.ARCHIVE_HABIT]: ({ habitName, onClose }) => (
		<AlertDialogue
			variant='info'
			heading='Archive Habit'
			body={`Are you sure you want to archive ${habitName}`}
			onClose={onClose}
			confirmButton='Archive'
		/>
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

	const Dialgoue = DIALOGUE_COMPONENTS[modal.type];

	return (
		<ModalContext.Provider
			value={{ modal, handleShowModal, handleHideModal }}>
			<Modal>
				<Dialgoue {...modal.props} />
			</Modal>
			{children}
		</ModalContext.Provider>
	);
}
