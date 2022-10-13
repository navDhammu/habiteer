import useOnOutsideClick from 'hooks/useOnOutsideClick';
import { cloneElement, createContext, useContext, useState } from 'react';

const PopoverContext = createContext();

export default function Popover({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<PopoverContext.Provider
			value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
			<div className='relative'>{children}</div>
		</PopoverContext.Provider>
	);
}

function Button({ children }) {
	const { toggle } = useContext(PopoverContext);
	return cloneElement(children, { onClick: toggle });
}

function Content({ children, as: Container = 'div', className = '' }) {
	const { isOpen, toggle } = useContext(PopoverContext);
	const cbRef = useOnOutsideClick(toggle);
	return (
		isOpen && (
			<Container
				ref={cbRef}
				className={`absolute right-0 top-[150%] w-40 rounded bg-white shadow-lg ${className}`}>
				{children}
			</Container>
		)
	);
}

Popover.Button = Button;
Popover.Content = Content;
