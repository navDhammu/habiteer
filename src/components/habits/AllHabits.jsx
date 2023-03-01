import HabitCard from 'components/habits/HabitCard';
import { useOutletContext } from 'react-router';

export default function AllHabits() {
	const habits = useOutletContext();

	return (
		<section className='h-full overflow-scroll'>
			<ul className=''>
				{habits.map((habit) => (
					<li
						key={habit.id}
						className='mb-4 rounded-md bg-white shadow-sm'>
						<HabitCard {...habit} />
					</li>
				))}
			</ul>
		</section>
	);
}
