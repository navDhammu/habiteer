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
import { HabitTodo } from '.';

type HabitTodosProps = {
	heading: string;
	todos: HabitTodo[];
};

export function HabitTodos({ heading, todos }: HabitTodosProps) {
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
							<ListItem key={id}>
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
