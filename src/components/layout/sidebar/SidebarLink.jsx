import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ to, Icon, text }) {
	return (
		<NavLink
			className={({ isActive }) =>
				clsx(
					'rounded-md` flex items-center gap-2 px-4 py-3 text-sm capitalize hover:bg-indigo-100',
					isActive && 'bg-indigo-100 font-semibold text-indigo-600'
				)
			}
			to={to}>
			<Icon size='1.5em' />
			{text}
		</NavLink>
	);
}
