import clsx from 'clsx';

export default function Checkbox({
	label,
	hideCheckbox,
	value,
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
					value={value}
					checked={checked}
					onChange={onChange}
				/>
				<span>{label}</span>
			</label>
		</>
	);
}
