import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ to, Icon, text }) {
	return (
		<NavLink
			className={({ isActive }) =>
				clsx(
					'rounded-md` flex items-center gap-2 rounded py-3 pl-4 text-sm capitalize',
					isActive
						? 'bg-white font-bold text-indigo-600 shadow'
						: 'text-gray-700'
				)
			}
			to={to}>
			<Icon size='1.5em' />
			{text}
		</NavLink>
	);
}
