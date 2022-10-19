import HabitsWithDetailsPanel from 'components/habits/HabitsWithDetailsPanel';
import HabitTodos from 'components/habits/HabitTodos';
import Heading from 'components/ui/Heading';


export default function Today() {
	
	return (
		<main className='relative p-8 md:p-6 overflow-y-scroll'>
			<Heading size='lg'>Today</Heading>
			<span className='text-sm text-gray-500'>
				{new Date().toDateString()}
			</span>
			<HabitsWithDetailsPanel habitListElement={<HabitTodos />} />
		</main>
	);
}
