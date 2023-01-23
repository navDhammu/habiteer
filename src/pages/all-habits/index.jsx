import AllHabits from 'components/habits/AllHabits';
import HabitsWithDetailsPanel from 'components/habits/HabitsWithDetailsPanel';
import Heading from 'components/ui/Heading';

export default function () {
	return (
		<main className='relative overflow-y-scroll pl-0 pt-4'>
			<Heading size='lg'>All habits</Heading>
			<HabitsWithDetailsPanel habitListElement={<AllHabits />} />
		</main>
	);
}
