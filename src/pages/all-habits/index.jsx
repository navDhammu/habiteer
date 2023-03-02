import AllHabits from 'components/habits/AllHabits';
import Heading from 'components/ui/Heading';

export default function () {
	return (
		<main className='relative overflow-y-scroll pl-0 pt-4'>
			<Heading size='lg'>All habits</Heading>
			<AllHabits />
		</main>
	);
}
