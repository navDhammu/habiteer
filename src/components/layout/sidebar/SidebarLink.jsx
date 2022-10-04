import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ to, Icon, label }) {
	return (
		<NavLink
			className={({ isActive }) =>
				clsx(
					'flex items-center gap-4 px-4 py-3 text-sm capitalize hover:bg-indigo-700',
					isActive && 'bg-indigo-700 text-white'
				)
			}
			to={to}>
			<Icon size='1.5em' />
			{label}
		</NavLink>
	);
}
