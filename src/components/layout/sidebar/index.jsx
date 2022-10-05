import { onSnapshot } from '@firebase/firestore';
import {
	IconCalendarEvent,
	IconFolder,
	IconLayoutDashboard,
	IconList,
	IconPlus,
} from '@tabler/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { createCategory } from 'services/dbOperations';
import { getUserDoc } from 'services/firestoreReferences';
import SidebarLink from './SidebarLink';

export default function Sidebar({ className, isMobile, habits }) {
	const [categoryValue, setCategoryValue] = useState('');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		return onSnapshot(getUserDoc(), (doc) => {
			setCategories(doc.data().categories || []);
			setCategoryValue('');
		});
	}, []);

	const hanldeCreateCategory = (e) => {
		if (e.type === 'keydown' && e.key === 'Enter') {
			createCategory(categoryValue);
		}
	};

	return (
		<aside
			className={clsx(
				'top-0 left-0 z-50 h-screen flex-col bg-indigo-800 p-4 shadow-md transition-all',
				isMobile
					? 'flex w-screen'
					: 'sticky hidden md:flex md:flex-col md:gap-4 lg:w-64',
				className
			)}>
			<h1 className='text-2xl text-white'>Habiterr</h1>
			<nav className='my-8 flex-1 text-indigo-300'>
				<ul className='flex flex-col'>
					<li>
						<SidebarLink
							to='/dashboard'
							Icon={IconLayoutDashboard}
							text='dashboard'
						/>
					</li>
					<li>
						<SidebarLink
							to='/today'
							Icon={IconCalendarEvent}
							text='today'
						/>
					</li>
					<li>
						<SidebarLink
							to='/all-habits'
							Icon={IconList}
							text='All Habits'
						/>
					</li>
				</ul>
				<h3 className='mt-4 text-xs uppercase'>Categories</h3>
				<ul className='flex flex-col'>
					{categories.map((category) => (
						<li key={category.id}>
							<SidebarLink
								to={`/${category.name}`}
								text={category.name}
								Icon={IconFolder}
							/>
						</li>
					))}
				</ul>
				<div className='flex items-center text-sm text-gray-300 hover:bg-indigo-900'>
					<IconPlus className='' />
					<input
						type='text'
						className='bg-blue-900/10 p-2 text-white outline-none'
						placeholder='New Category'
						value={categoryValue}
						onChange={(e) => setCategoryValue(e.target.value)}
						onKeyDown={hanldeCreateCategory}
					/>
				</div>
			</nav>
		</aside>
	);
}
