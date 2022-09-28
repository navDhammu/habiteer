import { CheckCircleIcon } from '@heroicons/react/outline';

export default function Notification({ type, message }) {
	return (
		<div>
			<CheckCircleIcon className='w-6 text-green-500' />
			<h2>{type}</h2>
			<p>{message}</p>
		</div>
	);
}
