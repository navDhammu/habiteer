import { useState } from 'react';

export default function useModal() {
	const [isModalOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleClose = (e) => {
		setIsOpen(false);
	};
	return {
		isModalOpen,
		handleOpen,
		handleClose,
	};
}
