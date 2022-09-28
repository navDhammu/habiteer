import { ChevronDownIcon, UserIcon } from '@heroicons/react/outline';
import { auth } from '../services';
import IconButton from './Button/IconButton';

export default function User() {
	return (
		<div
			className='flex items-center gap-2
		'>
			<UserIcon className='w-7' />
			<span className='hidden lg:block'>
				{auth.currentUser?.displayName || auth.currentUser?.email}
			</span>
			<IconButton Icon={ChevronDownIcon} size='md' />
		</div>
	);
}
