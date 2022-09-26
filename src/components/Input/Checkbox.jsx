import clsx from 'clsx';

export default function Checkbox({
	label,
	hideCheckbox,
	name,
	checked,
	onChange,
}) {
	return (
		<>
			<label
				className={clsx(
					'flex h-full cursor-pointer items-center gap-2 font-sans capitalize'
				)}>
				<input
					className={hideCheckbox ? 'hidden' : ''}
					type='checkbox'
					name={name}
					checked={checked}
					onChange={onChange}
				/>
				{label}
			</label>
		</>
	);
}
