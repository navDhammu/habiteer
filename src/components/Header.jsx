import {
	IconBellMinus,
	IconChevronDown,
	IconHelp,
	IconMenu2,
	IconSearch,
	IconUser,
} from '@tabler/icons';
import { useState } from 'react';
import { auth } from '../firebase';
import Button from './Button/Button';
import IconButton from './Button/IconButton';
import PopupMenu from './PopupMenu';

export default function Header({ onMenuClick, className }) {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

	return (
		<header
			className={`sticky top-0 flex h-16 items-center justify-between border border-slate-200 bg-white px-8 ${className}`}>
			{/* hamburger icon */}
			<IconButton
				className='lg:hidden'
				Icon={IconMenu2}
				onClick={onMenuClick}
				size='md'
			/>

			<div className='text-end flex-1 space-x-2 border-r pr-4'>
				<IconButton size='md' Icon={IconSearch} variant='filled' />
				<IconButton size='md' Icon={IconBellMinus} variant='filled' />
				<IconButton size='md' Icon={IconHelp} variant='filled' />
			</div>
			{/* user */}
			<Button
				IconLeft={IconUser}
				IconRight={IconChevronDown}
				onClick={toggleUserMenu}>
				<span className='hidden text-xs font-semibold uppercase text-slate-600 md:inline'>
					{auth.currentUser.displayName || auth.currentUser.email}
				</span>
				<PopupMenu isOpen={isUserMenuOpen} onClose={toggleUserMenu}>
					<Button size='sm'>settings</Button>
					<Button size='sm'>logout</Button>
				</PopupMenu>
			</Button>
		</header>
	);
}
