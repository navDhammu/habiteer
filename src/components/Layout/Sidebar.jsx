import {
	IconCalendar,
	IconChartBar,
	IconChecklist,
	IconLayoutDashboard,
	IconLayoutSidebarLeftCollapse,
	IconLayoutSidebarLeftExpand,
	IconPlus,
} from '@tabler/icons';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useWindowWidth from '../../hooks/useWindowWidth';
import Checklist from '../../pages/checklist';
import Dashboard from '../../pages/dashboard';
import Allhabits from '../../pages/habits';
import Stats from '../../pages/stats';
import Button from '../Button/Button';
import IconButton from '../Button/IconButton';
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

const BREAKPOINT = 1024;

export default function Sidebar({ className }) {
	const windowWidth = useWindowWidth();
	const [isHidden, setIsHidden] = useState(windowWidth < BREAKPOINT);
	const { modal, handleShowModal } = useContext(ModalContext);
	const location = useLocation();

	useEffect(() => {
		if (windowWidth < BREAKPOINT) {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}
	}, [windowWidth]);

	useEffect(() => {
		if (!isHidden && windowWidth < BREAKPOINT) setIsHidden(true);
	}, [location, modal.type]);

	return (
		<aside
			className={clsx(
				'sticky top-0 left-0 z-50 flex h-screen flex-col bg-slate-800 transition-all',
				isHidden ? 'w-0 overflow-x-hidden' : 'min-w-fit p-4',
				className
			)}>
			<img src={logo} alt='logo' className='max-w-[250px]' />
			<Button
				className='mt-4'
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
								)
							}
							to={to}>
							<Icon size='1.5em' className='' />
							{label}
						</NavLink>
					))}
				</ul>
			</nav>
			<IconButton
				className={clsx(
					'top-0 rounded-none',
					isHidden
						? 'fixed left-0'
						: 'absolute right-0 translate-x-full transform'
				)}
				size='lg'
				Icon={
					isHidden
						? IconLayoutSidebarLeftExpand
						: IconLayoutSidebarLeftCollapse
				}
				onClick={() => setIsHidden(!isHidden)}
			/>
		</aside>
	);
}
