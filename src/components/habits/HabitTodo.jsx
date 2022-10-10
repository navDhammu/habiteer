import { IconGridDots } from '@tabler/icons';
import { markHabitComplete } from 'services/dbOperations';
import Checkbox from '../form/Checkbox';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function HabitTodo({ id, name, isComplete, onDetailsClick }) {
	return (
		<Card className={`flex items-center`}>
			<IconGridDots size='0.8em' className='mr-3 text-gray-400' />
			<Checkbox
				label={name}
				className='grow'
				checked={isComplete}
				onChange={(e) =>
					markHabitComplete(e.target.checked, id, new Date())
				}
			/>
			<Button
				onClick={(e) => onDetailsClick(id)}
				variant='tertiary'
				size='sm'
				className=''>
				View Details
			</Button>
		</Card>
	);
}
