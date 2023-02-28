import {
	IconBellMinus,
	IconHelp,
	IconLogout,
	IconMenu2,
	IconSettings,
	IconUser,
} from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { logout } from 'services/auth';
import IconButton from '../ui/IconButton';
import Popover from '../ui/Popover';

export default function Header({ onMenuClick, className = '', ...props }) {
	return (
		<header
			{...props}
			className={`flex items-center justify-between bg-green-600 px-2 md:px-8 ${className}`}>
			<IconButton
				className='text-slate-100 md:hidden'
				id='hamburger-menu'
				Icon={IconMenu2}
				size='md'
				onClick={onMenuClick}
			/>
			<h1 className='text-xl text-slate-100 md:text-2xl'>Habiterr</h1>
			{/* <input type="text" className='bg-white/10 mx-2 rounded w-1/4 px-4 py-1 hover:bg-white hover:text-black text-slate-100 placeholder:text-slate-300' placeholder='Search'/> */}
			{/* <div className="grow"></div>
			<IconButton size='md' Icon={IconBellMinus} className='text-slate-100'/>
			<IconButton size='md' Icon={IconHelp} className='text-slate-100'/> */}
			<Popover>
				<Popover.Button>
					<IconButton
						Icon={IconUser}
						shape='rounded'
						variant='filled'
						size='sm'
					/>
				</Popover.Button>
				<Popover.Content>
					<ul className='flex flex-col text-sm [&>*:hover]:bg-stone-100 [&>*]:cursor-pointer [&>*]:p-2'>
						<li className='flex gap-2 [&>:last-child]:flex-1'>
							<IconSettings />
							<NavLink to='#'>Settings</NavLink>
						</li>
						<li className='flex gap-2 [&>:last-child]:flex-1'>
							<IconLogout />
							<button
								className='text-left'
								onClick={() => {
									logout();
								}}>
								Logout
							</button>
						</li>
					</ul>
				</Popover.Content>
			</Popover>
		</header>
	);
}
