import { cloneElement, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from './GlobalModal';

export default function Modal({ children: dialogue }) {
	const backdrop = useRef();
	const { modal, handleHideModal } = useContext(ModalContext);

	useEffect(() => {
		const handleClick = (e) => {
			if (e.target === backdrop.current) handleHideModal();
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	return modal.type
		? createPortal(
				<div
					ref={backdrop}
					className='fixed top-0 h-full w-full bg-gray-900 bg-opacity-70'>
					{cloneElement(dialogue, { onClose: handleHideModal })}
				</div>,
				document.getElementById('root')
		  )
		: null;
}
