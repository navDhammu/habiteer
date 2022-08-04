import useOnOutsideClick from '../hooks/useOnOutsideClick';

export default function PopupMenu({ isOpen, children, onClose }) {
	const cbRef = useOnOutsideClick(onClose);

	if (!isOpen) return null;
	return (
		<ul ref={cbRef} className='absolute z-40 bg-white drop-shadow-lg'>
			{children.map((child) => (
				<li key={child} className='cursor-pointer hover:bg-slate-100'>
					{child}
				</li>
			))}
		</ul>
	);
}
