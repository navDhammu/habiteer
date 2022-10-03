import {
	IconCalendar,
	IconChecklist,
	IconLayoutDashboard,
} from '@tabler/icons';
import logo from 'assets/logo.png';
import clsx from 'clsx';
import CreateHabitBtn from 'components/ui/CreateHabitBtn';
import Checklist from 'pages/checklist';
import Dashboard from 'pages/dashboard';
import Allhabits from 'pages/habits';
import { NavLink } from 'react-router-dom';

export const links = [
	{
		label: 'dashboard',
		to: '/dashboard',
		Icon: IconLayoutDashboard,
		Component: Dashboard,
	},
	{
		label: ['today', 1],
		to: '/checklist',
		Icon: IconChecklist,
		Component: Checklist,
	},
	{
		label: 'All Habits',
		to: '/habits',
		Icon: IconCalendar,
		Component: Allhabits,
	},
];

export default function Sidebar({ className, isMobile, habits }) {
	return (
		<aside
			className={clsx(
				'top-0 left-0 z-50 h-screen flex-col bg-indigo-900 p-4 transition-all',
				isMobile
					? 'flex w-screen'
					: 'sticky hidden md:flex md:flex-col md:gap-4 lg:w-64',
				className
			)}>
			{!isMobile && (
				<img src={logo} alt='logo' className='max-w-[250px]' />
			)}
			<CreateHabitBtn />
			<nav className='my-8 flex-1 text-sm'>
				<ul className='flex flex-col'>
					{links.map(({ to, Icon, label }) => (
						<NavLink
							key={to}
							className={({ isActive }) =>
								clsx(
									'flex items-center gap-4 rounded-lg p-4 capitalize',
									isActive
										? ' bg-black/20 text-white'
										: 'text-gray-400'
								)
							}
							to={to}>
							<Icon size='1.5em' />
							{label}
							{}
						</NavLink>
					))}
				</ul>
			</nav>
		</aside>
	);
}
