import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';

const PopoverContext = createContext();

export default function Popover({ children }) {
	const [coordinates, setCoordinates] = useState(null);

	const closePopver = () => setCoordinates(null);

	const handleClick = (e) => {
		e.stopPropagation();
		if (coordinates instanceof DOMRectReadOnly) {
			closePopver();
		} else {
			setCoordinates(e.target.getBoundingClientRect());
		}
	};

	return (
		<PopoverContext.Provider
			value={{
				coordinates,
				onClick: handleClick,
				closePopver,
			}}>
			<div className='relative'>{children}</div>
		</PopoverContext.Provider>
	);
}

function Button({ children: child }) {
	const { onClick } = useContext(PopoverContext);
	return cloneElement(child, { onClick });
}

function Content({ children, as: Container = 'div', className = '' }) {
	const { coordinates, closePopver } = useContext(PopoverContext);
	const cbRef = useOnOutsideClick(closePopver);
	console.log(coordinates);
	const showPopover = coordinates instanceof DOMRectReadOnly;
	return (
		showPopover &&
		createPortal(
			<Container
				ref={cbRef}
				style={{
					position: 'absolute',
					left: coordinates.right,
					top: coordinates.bottom + 16,
				}}
				className={`w-40 -translate-x-full transform rounded border bg-white shadow ${className}`}>
				{children}
			</Container>,
			document.getElementById('root')
		)
	);
}

Popover.Button = Button;
Popover.Content = Content;
