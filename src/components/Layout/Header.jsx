import {
	IconBellMinus,
	IconHelp,
	IconLogout,
	IconMenu2,
	IconSearch,
	IconSettings,
	IconUser,
	IconX
} from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import IconButton from '../ui/IconButton';
import Popover from '../ui/Popover';

export default function Header({ showMobileSidebar, onMenuClick, className }) {
	return (
		<header
			className={`sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-8 shadow-sm ${className}`}>
			<IconButton
				Icon={showMobileSidebar ? IconX : IconMenu2}
				size='lg'
				onClick={onMenuClick}
				className='md:hidden'
			/>
			<div className='text-end flex-1 space-x-2 border-r pr-4'>
				<IconButton size='md' Icon={IconSearch} variant='filled' />
				<IconButton size='md' Icon={IconBellMinus} variant='filled' />
				<IconButton size='md' Icon={IconHelp} variant='filled' />
			</div>
			<Popover>
				<Popover.Button>
					<IconButton Icon={IconUser} />
				</Popover.Button>
				<Popover.Content>
					<ul className='[&>*:hover]:bg-stone-100 [&>*]:p-2 [&>*]:cursor-pointer flex flex-col text-sm'>
						<li className='flex gap-2 text-gray-600'>
							<IconSettings />
							<NavLink to='#'>Settings</NavLink>
						</li>
						<li className='flex gap-2 text-gray-600'>
							<IconLogout />
							<button>Logout</button>
						</li>
					</ul>
				</Popover.Content>
			</Popover>
		</header>
	);
}
