import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../Header';
import Modal from '../Modal';
import NoHabits from '../NoHabits';
import Sidebar from '../Sidebar';

export default function AppLayout({ habits }) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);
	const route = useLocation();

	useEffect(() => {
		window.addEventListener('resize', () =>
			setWindowWidth(window.innerWidth)
		);
	}, []);

	useEffect(() => {
		setShowMobileSidebar(false);
	}, [route]);

	const handleMenuClick = () => {
		setShowMobileSidebar(!showMobileSidebar);
	};

	return (
		<div className='bg- flex'>
			{windowWidth < 1024 && showMobileSidebar ? (
				<Modal
					position='left'
					onClose={() => setShowMobileSidebar(false)}>
					<Sidebar isMobile />
				</Modal>
			) : (
				<Sidebar />
			)}

			<div className='flex flex-1 flex-col'>
				<Header onMenuClick={handleMenuClick} />
				{habits.length > 0 ? <Outlet /> : <NoHabits />}
			</div>
		</div>
	);
}
