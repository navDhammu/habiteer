import { IconArrowLeft, IconPointer } from '@tabler/icons';
import Heading from 'components/ui/Heading';
import IconButton from '../../components/ui/IconButton';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function HabitDetails({ habit, onBackClick }) {
	const windowWidth = useWindowWidth();

	const isMobile = windowWidth < 640;

	if (isMobile && !habit) return null;

	return (
		<section className='absolute inset-0 bg-slate-100 p-4 sm:relative sm:h-auto sm:w-auto sm:grow'>
			{!habit ? (
				<div className='abs-center text-center'>
					<IconPointer className='mx-auto' />
					Click on a habit to see its details
				</div>
			) : (
				<>
					{isMobile && (
						<IconButton
							onClick={onBackClick}
							Icon={IconArrowLeft}
						/>
					)}
					<Heading>{habit.habitName}</Heading>
					<p className='text-gray-500'>{habit.habitDescription}</p>
					<div>Additional habit details go here</div>
				</>
			)}
		</section>
	);
}
