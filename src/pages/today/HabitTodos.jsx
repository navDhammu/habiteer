import {
	Heading,
	Card,
	CardHeader,
	CardBody,
	List,
	ListItem,
	Checkbox,
} from '@chakra-ui/react';
import { markHabitComplete } from 'services/dbOperations';

export function HabitTodos({ heading, todos }) {
	if (!todos.length) return null;
	return (
		<Card>
			<CardHeader as={Heading} size='sm'>
				{heading}
			</CardHeader>
			<CardBody>
				<List>
					{todos
						.sort((a, b) => a.name < b.name && -1)
						.map(({ id, isComplete, name }) => (
							<ListItem>
								<Checkbox
									isChecked={isComplete}
									onChange={(e) =>
										markHabitComplete(
											e.target.checked,
											id,
											new Date()
										)
									}>
									{name}
								</Checkbox>
							</ListItem>
						))}
				</List>
			</CardBody>
		</Card>
	);
}
