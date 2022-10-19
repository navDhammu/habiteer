import {
	IconBellMinus,
	IconHelp,
	IconLogout,
	IconMenu2,

	IconSettings,
	IconUser
} from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import IconButton from '../ui/IconButton';
import Popover from '../ui/Popover';

export default function Header({ onMenuClick, className = '', ...props }) {
	return (
		<header
			{...props}
			className={`flex items-center justify-between bg-indigo-600 px-8 ${className}`}>
			<IconButton
				className='md:hidden text-slate-100'
				id='hamburger-menu'
				Icon={IconMenu2}
				size='lg'
				onClick={onMenuClick}

			
			/>
			<h1 className='text-2xl text-slate-100'>Habiterr</h1>
			<input type="text" className='bg-white/10 mx-2 rounded w-1/4 px-4 py-1 hover:bg-white hover:text-black text-slate-100 placeholder:text-slate-300' placeholder='Search'/>
			<div className='text-end flex-1 space-x-2 border-r pr-4'>
				<IconButton size='md' Icon={IconBellMinus} className='text-slate-100'/>
				<IconButton size='md' Icon={IconHelp} className='text-slate-100'/>
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
						<li className='flex gap-2'>
							<IconLogout className='text-slate-100'/>
							<button>Logout</button>
						</li>
					</ul>
				</Popover.Content>
			</Popover>
		</header>
	);
}
