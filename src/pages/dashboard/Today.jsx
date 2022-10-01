// import { IconArrowRight } from '@tabler/icons';
// import Card from 'components/ui/Card';
// import { NavLink } from 'react-router-dom';

// export default function Today({ habits }) {

// 	return (
// 		<Card as='section' className='sm:max-w-sm'>
// 			<header className='border-b pb-2'>
// 				<h2 className='mr-2 inline text-lg font-bold'>
// 					Today's Habits
// 				</h2>
// 				<span className='text-sm text-gray-400'>
// 					{new Date().toLocaleDateString()}
// 				</span>
// 			</header>
// 			<ul className='my-2'>
// 				{habits.map((habit) => (
// 					<li
// 						key={habit.id}
// 						className='border-b border-gray-100 py-2'>
// 						<label className='inline-flex gap-2 capitalize'>
// 							<input type='checkbox' />
// 							{habit.habitName}
// 						</label>
// 						<div className='text-sm text-gray-400'>
// 							{habit.habitDescription}
// 						</div>
// 					</li>
// 				))}
// 			</ul>
// 			{/* <HabitList habits={habits} /> */}
// 			<footer className='flex justify-end'>
// 				<NavLink
// 					to='/checklist'
// 					className='ml-2 flex items-center text-sm text-indigo-500 hover:text-indigo-700'>
// 					See details
// 					<IconArrowRight className='w-5' />
// 				</NavLink>
// 			</footer>
// 		</Card>
// 	);
// }
