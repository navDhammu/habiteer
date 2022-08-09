import {
	IconCalendar,
	IconChartBar,
	IconChecklist,
	IconLayoutDashboard,
	IconPlus,
} from '@tabler/icons';
import clsx from 'clsx';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Checklist from '../../pages/checklist';
import Dashboard from '../../pages/dashboard';
import Allhabits from '../../pages/habits';
import Stats from '../../pages/stats';
import Button from '../Button/Button';
import { ModalContext, MODAL_TYPES } from '../Modals/GlobalModal';

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

// const SIDEBAR_BREAKPOINT = 1023;

export default function Sidebar({ className }) {
	const { modal, handleShowModal, handleHideModal } =
		useContext(ModalContext);
	const isMobileSidebar = modal.type === MODAL_TYPES.SIDEBAR;

	return (
		<aside
			className={clsx(
				isMobileSidebar ? 'absolute flex' : 'sticky hidden lg:flex',
				'left-0 top-0 h-screen w-[250px] flex-col bg-slate-800 p-4 transition-all',
				className
			)}>
			<div className='my-4 text-2xl font-bold text-indigo-500 underline'>
				Habiterr
			</div>
			<Button
				variant='primary'
				size='md'
				IconLeft={IconPlus}
				onClick={() => handleShowModal(MODAL_TYPES.HABIT_FORM)}>
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
