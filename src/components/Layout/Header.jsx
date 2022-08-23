import { signOut } from '@firebase/auth';
import {
	IconBellMinus,
	IconChevronDown,
	IconHelp,
	IconSearch,
	IconUser,
} from '@tabler/icons';
import { useContext, useState } from 'react';
import { auth } from '../../firebase';
import Button from '../Button/Button';
import IconButton from '../Button/IconButton';
import { ModalContext } from '../Modals/GlobalModal';
import PopupMenu from '../PopupMenu';

export default function Header({ onMenuClick, className }) {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const { handleShowModal } = useContext(ModalContext);

	const handleOpenUserMenu = (e) => {
		e.stopPropagation();
		setIsUserMenuOpen(true);
	};
	return (
		<header
			className={`sticky top-0 flex h-16 items-center justify-between bg-white px-8 ${className}`}>
			<div className='text-end flex-1 space-x-2 border-r pr-4'>
				<IconButton size='md' Icon={IconSearch} variant='filled' />
				<IconButton size='md' Icon={IconBellMinus} variant='filled' />
				<IconButton size='md' Icon={IconHelp} variant='filled' />
			</div>
			{/* user */}
			<Button
				IconLeft={IconUser}
				IconRight={IconChevronDown}
				onClick={handleOpenUserMenu}>
				<span className='hidden text-xs font-semibold uppercase text-slate-600 md:inline'>
					{auth.currentUser.displayName || auth.currentUser.email}
				</span>
				<PopupMenu
					isOpen={isUserMenuOpen}
					onClose={() => setIsUserMenuOpen(false)}>
					<Button size='sm'>profile</Button>
					<Button size='sm' onClick={() => signOut(auth)}>
						logout
					</Button>
				</PopupMenu>
			</Button>
		</header>
	);
}
