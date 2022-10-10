import { useId } from 'react';

export default function Checkbox({ label, checked, onChange, className = '' }) {
	const id = useId();
	return (
		<div className={`relative flex items-center gap-3 ${className}`}>
			<input
				className={`group relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-400 transition-all before:absolute before:inset-0 before:left-1/2 before:top-1/2 before:inline-block before:h-3/4 before:w-1/3 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:border-b-2 before:border-r-2 before:border-white before:opacity-0 before:content-[''] checked:border-emerald-400 checked:bg-emerald-400 checked:before:opacity-100`}
				type='checkbox'
				id={id}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={id} className='cursor-pointer'>
				{label}
			</label>
		</div>
	);
}
