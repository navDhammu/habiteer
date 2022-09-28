import useWindowWidth from 'hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import GlobalModal from '../ui/GlobalModal';
import Header from './Header';
import Sidebar from './Sidebar';

const SIDEBAR_BREAKPOINT = 768;

export default function AppLayout({ habits }) {
	const windowWidth = useWindowWidth();
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);
	const { pathname } = useLocation();
	const onMenuClick = () => setShowMobileSidebar(!showMobileSidebar);

	useEffect(() => {
		setShowMobileSidebar(false);
	}, [pathname]);

	useEffect(() => {
		if (windowWidth > SIDEBAR_BREAKPOINT) setShowMobileSidebar(false);
	}, [windowWidth]);

	return (
		<GlobalModal>
			<div className='flex'>
				<Sidebar />
				<div className='flex flex-1 flex-col'>
					<Header
						showMobileSidebar={showMobileSidebar}
						onMenuClick={onMenuClick}
					/>
					{showMobileSidebar ? <Sidebar isMobile /> : <Outlet />}
				</div>
			</div>
		</GlobalModal>
	);
}
