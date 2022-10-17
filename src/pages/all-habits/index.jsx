
import AllHabits from 'components/habits/AllHabits';
import HabitsWithDetailsPanel from 'components/habits/HabitsWithDetailsPanel';
import Heading from 'components/ui/Heading';


export default function () {

	return (
		<main className='relative p-6'>
			<Heading size='lg'>All habits</Heading>
			<HabitsWithDetailsPanel
				habitListElement={<AllHabits />}
			/>
		</main>
	);
}

