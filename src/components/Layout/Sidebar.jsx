import {
	IconCalendar,
	IconChartBar,
	IconChecklist,
	IconLayoutDashboard,
} from '@tabler/icons';
import logo from 'assets/logo.png';
import clsx from 'clsx';
import CreateHabitBtn from 'components/ui/CreateHabitBtn';
import Checklist from 'pages/checklist';
import Dashboard from 'pages/dashboard';
import Allhabits from 'pages/habits';
import Stats from 'pages/stats';
import { NavLink } from 'react-router-dom';

export const links = [
	{
		label: 'dashboard',
		to: '/dashboard',
		Icon: IconLayoutDashboard,
		Component: Dashboard,
	},
	{
		label: 'checklist',
		to: '/checklist',
		Icon: IconChecklist,
		Component: Checklist,
	},
	{
		label: 'My Habits',
		to: '/habits',
		Icon: IconCalendar,
		Component: Allhabits,
	},
	{
		label: 'Statistics',
		to: '/statistics',
		Icon: IconChartBar,
		Component: Stats,
	},
];

export default function Sidebar({ className, isMobile }) {
	return (
		<aside
			className={clsx(
				'top-0 left-0 z-50 h-screen flex-col bg-slate-800 p-4 transition-all',
				isMobile ? 'flex w-screen' : 'sticky hidden md:flex',
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
										? ' bg-slate-900 text-white'
										: 'text-gray-400'
								)
							}
							to={to}>
							<Icon size='1.5em' className='' />
							{label}
						</NavLink>
					))}
				</ul>
			</nav>
		</aside>
	);
}
