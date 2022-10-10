import { IconZoomExclamation } from '@tabler/icons';
import HabitTodo from 'components/habits/HabitTodo';

export default function HabitTodoList({ habitTodos, onDetailsClick }) {
	if (habitTodos.length === 0)
		return (
			<div className='mt-8 flex flex-col items-center gap-4'>
				<IconZoomExclamation
					className='rounded-full bg-slate-200 p-2 text-slate-500'
					size='48px'
				/>
				<p>No habits found for this day</p>
			</div>
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
