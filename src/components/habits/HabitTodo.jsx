import { IconGridDots } from '@tabler/icons';
import { markHabitComplete } from 'services/dbOperations';
import { Card, CardBody, Checkbox } from '@chakra-ui/react';

export default function HabitTodo({ id, name, isComplete }) {
	return (
		<Card variant='outline'>
			<CardBody>
				<Checkbox
					isChecked={isComplete}
					onChange={(e) =>
						markHabitComplete(e.target.checked, id, new Date())
					}>
					{name}
				</Checkbox>
			</CardBody>
		</Card>
	);
}
