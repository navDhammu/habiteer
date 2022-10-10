import { IconListSearch } from '@tabler/icons';
import HabitTodo from 'components/habits/HabitTodo';
import EmptyState from '../EmptyState';

export default function HabitTodoList({ habitTodos, onDetailsClick }) {
	if (habitTodos.length === 0)
		return (
			<EmptyState icon={<IconListSearch />} text='no habits to display' />
		);
	return (
		<ul className='flex flex-col gap-3'>
			{habitTodos
				.sort((a, b) => a.name < b.name && -1)
				.map(({ id, isComplete, name }) => (
					<HabitTodo
						key={id}
						id={id}
						name={name}
						isComplete={isComplete}
						onDetailsClick={onDetailsClick}
					/>
				))}
		</ul>
	);
}
