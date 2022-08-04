import clsx from 'clsx';
import { forwardRef } from 'react';
import { Bottomtext } from './BottomText';
import Label from './Label';

function InputField(
	{
		as: Input = 'input',
		variant,
		component,
		type,
		id,
		label,
		value,
		placeholder,
		onChange,
		iconLeft: IconLeft,
		iconRight: IconRight,
		onClear,
		errorMsg,
		helperText,
		children,
		isRequired,
		...rest
	},
	ref
) {
	const inputClasses = clsx(
		'peer w-full rounded-lg px-4 py-2 transition-all hover:bg-gray-50 focus:ring-2',
		errorMsg
			? 'border-red-500 ring-red-200'
			: 'ring-sky-200  border-gray-300',
		IconLeft && 'pl-10',
		variant === 'filled' ? 'bg-gray-100' : 'border'
	);

	return (
		<div className={`relative flex flex-col ${rest.classnames}`}>
			<Label htmlFor={id} isRequired={isRequired}>
				{label}
			</Label>
			<div className='relative'>
				{component || (
					<Input
						className={inputClasses}
						id={id}
						ref={ref}
						type={type}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						{...rest}
					/>
				)}
				{IconLeft && (
					<IconLeft
						className={`absolute top-1/2 left-3 w-5 -translate-y-1/2 ${
							errorMsg ? 'text-red-500' : ''
						}`}
					/>
				)}
				{IconRight && (
					<IconRight className='absolute top-1/2 right-2 w-4 -translate-y-1/2 transform transition-transform peer-focus:rotate-180' />
				)}
			</div>

			<Bottomtext errorMsg={errorMsg} helperText={helperText} />
		</div>
	);
}

export default forwardRef(InputField);

// InputField.propTypes = {
// 	onClear: PropTypes.func.isRequired,
// };
