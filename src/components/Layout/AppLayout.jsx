import { Outlet } from 'react-router';
import GlobalModal from '../Modals/GlobalModal';
import NoHabits from '../NoHabits';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppLayout({ habits }) {
	return (
		<GlobalModal>
			<div className='flex'>
				<Sidebar />
				<div className='flex w-full flex-1 flex-col'>
					<Header />
					{habits.length > 0 ? <Outlet /> : <NoHabits />}
				</div>
			</div>
		</GlobalModal>
	);
}
