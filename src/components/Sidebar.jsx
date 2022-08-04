import {
	IconCalendar,
	IconChartBar,
	IconChecklist,
	IconLayoutDashboard,
} from '@tabler/icons';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import useModal from '../hooks/useModal';
import Dashboard from '../pages/dashboard';
import Allhabits from '../pages/habits';
import Stats from '../pages/stats';
import Button from './Button/Button';
import HabitForm from './HabitForm';
import Modal from './Modal';

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
		Component: Dashboard,
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
	const { isModalOpen, handleClose, handleOpen } = useModal();

	return (
		<aside
			className={`sticky left-0 top-0 ${
				isMobile ? 'flex' : 'hidden'
			} h-screen w-[250px] flex-col bg-slate-800 p-4 transition-all lg:flex ${className}`}>
			<div className='my-4 text-2xl font-bold text-indigo-500'>
				Habiterize
			</div>
			{isModalOpen && (
				<Modal onClose={handleClose} className='rounded-2xl bg-white'>
					<HabitForm />
				</Modal>
			)}

			<Button
				className=''
				variant='primary'
				size='lg'
				onClick={handleOpen}>
				Create Habit
			</Button>

			<nav className='my-8 flex-1 text-sm'>
				<ul className='flex flex-col'>
					{links.map(({ to, Icon, label }) => (
						<NavLink
							className={({ isActive }) =>
								clsx(
									'flex items-center gap-4 rounded-lg p-4 capitalize',
									isActive
										? ' bg-slate-900 text-white'
										: 'text-gray-400'
									// isActive && 'bg-white'
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
