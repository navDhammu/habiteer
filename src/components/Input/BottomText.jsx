import { CheckCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { BiErrorCircle } from 'react-icons/bi';

export function Bottomtext({ errorMsg, helperText }) {
	if (!helperText && !errorMsg) return null;
	return (
		<div
			className={clsx(
				'mt-1 flex items-center gap-2 text-sm',
				errorMsg ? 'text-red-400' : 'text-gray-600'
			)}>
			{errorMsg ? (
				<BiErrorCircle className='w-4 self-baseline' />
			) : (
				<CheckCircleIcon className='w-4' />
			)}

			<span className='leading-none'>{errorMsg || helperText}</span>
		</div>
	);
}
