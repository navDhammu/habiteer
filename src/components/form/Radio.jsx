export default function Radio(props) {
	const { label, value, ...inputProps } = props;
	return (
		<div>
			<input
				{...inputProps}
				type='radio'
				id={value}
				value={value}
				className='peer hidden'
			/>
			<label
				htmlFor={value}
				className={`relative z-10 cursor-pointer rounded-full px-8 py-2 capitalize text-gray-300 transition-all duration-500 peer-checked:text-white`}>
				{label}
			</label>
		</div>
	);
}
