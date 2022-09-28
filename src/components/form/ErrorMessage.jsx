import { ExclamationIcon } from '@heroicons/react/outline';

export default function ErrorMessage({ children, showIcon }) {
	if (!children) return null;
	return (
		<span className='flex items-center gap-1 text-sm text-red-500'>
			{showIcon && <ExclamationIcon className='h-4' />}
			{children}
		</span>
	);
}
