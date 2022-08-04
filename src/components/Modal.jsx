import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import IconButton from './Button/IconButton';

export default function Modal({
	children,
	onClose,
	position = 'center',
	className,
}) {
	const refCallback = useOnOutsideClick(onClose);

	return createPortal(
		<div className='fixed top-0 h-full w-full bg-gray-900 bg-opacity-70'>
			<div
				ref={refCallback}
				className={clsx(
					className,
					'fixed',
					position === 'center' &&
						'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform',
					position === 'left' && 'left-0 top-0'
				)}>
				<IconButton
					Icon={XIcon}
					size='md'
					className='absolute right-0 z-50 mt-3 mr-3 w-8'
					onClick={onClose}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('root')
	);
}
