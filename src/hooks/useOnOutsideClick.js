import { useRef } from 'react';

export default function useOnOutsideClick(handleOutsideClick) {
	const cleanupRef = useRef();
	const setRef = (node) => {
		if (cleanupRef.current) cleanupRef.current();
		if (node !== null) {
			const listener = (e) => {
				if (!node.contains(e.target)) handleOutsideClick();
			};
			document.addEventListener('click', listener);
			cleanupRef.current = () =>
				document.removeEventListener('click', listener);
		}
	};

	return setRef;
}
