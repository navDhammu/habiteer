import { onSnapshot, query } from '@firebase/firestore';
import useWindowWidth from 'hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { habitsCollection } from '../../services/firestoreReferences';
import GlobalModal from '../ui/GlobalModal';
import Header from './Header';
import Sidebar from './Sidebar';

const SIDEBAR_BREAKPOINT = 768;

export default function AppLayout({ user }) {
	const [habits, setHabits] = useState([]);
	const [isLoadingHabits, setIsLoadingHabits] = useState(true);
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);
	const windowWidth = useWindowWidth();
	const { pathname } = useLocation();

	const onMenuClick = () => setShowMobileSidebar(!showMobileSidebar);

	useEffect(() => {
		setShowMobileSidebar(false);
	}, [pathname]);

	useEffect(() => {
		if (windowWidth > SIDEBAR_BREAKPOINT) setShowMobileSidebar(false);
	}, [windowWidth]);

	useEffect(() => {
		if (user) {
			return onSnapshot(
				query(habitsCollection()),
				{ includeMetadataChanges: true },
				(snapshot) => {
					if (snapshot.empty) {
						setHabits([]);
						return setIsLoadingHabits(false);
					}
					snapshot.docChanges().forEach(({ type, doc }) => {
						const change = {
							id: doc.id,
							...doc.data(),
						};
						switch (type) {
							case 'added':
								setHabits((prev) => [...prev, change]);
								return setIsLoadingHabits(false);
							case 'modified':
								setHabits((prev) => {
									let filtered = prev.filter(
										(habit) => habit.id !== change.id
									);
									return [...filtered, change];
								});
								return setIsLoadingHabits(false);
							case 'removed':
								setHabits((prev) =>
									prev.filter(
										(habit) => habit.id !== change.id
									)
								);
								return setIsLoadingHabits(false);
							default:
								throw new Error(`type ${type} not found`);
						}
					});
				}
			);
		}
	}, [user]);

	return (
		<GlobalModal>
			<div className='flex'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<Header
						showMobileSidebar={showMobileSidebar}
						onMenuClick={onMenuClick}
					/>
					{showMobileSidebar ? (
						<Sidebar isMobile habits={habits} />
					) : isLoadingHabits ? (
						'loading habits...'
					) : (
						<Outlet context={habits} />
					)}
				</div>
			</div>
		</GlobalModal>
	);
}
