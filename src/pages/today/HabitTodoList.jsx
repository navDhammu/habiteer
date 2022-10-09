import { IconMenu2 } from '@tabler/icons';
import Checkbox from '../../components/form/Checkbox';
import { markHabitComplete } from '../../services/dbOperations';

export default function HabitTodoList({ habitTodos, onTodoClick }) {
	return (
		<>
			{/* <h2 className='font-semibold capitalize text-slate-800'>
				{heading}
			</h2> */}
			<ul className='flex flex-col gap-3'>
				{habitTodos
					.sort((a, b) => a.name < b.name && -1)
					.map((habit) => {
						return (
							<li
								key={habit.id}
								onClick={() => onTodoClick(habit.id)}
								className={`flex items-center space-x-2 rounded-md border border-slate-200 p-4 shadow-sm hover:bg-gray-100 ${
									habit.isComplete ? 'bg-white' : 'bg-white'
								}`}>
								<IconMenu2 className='inline h-4 cursor-move text-gray-300' />
								<Checkbox
									label={habit.name}
									checked={habit.isComplete}
									onChange={(e) =>
										markHabitComplete(
											e.target.checked,
											habit.id,
											new Date()
										)
									}
								/>
								{/* <Heading size='sm'>{habit.name}</Heading> */}
								<p>{habit.description}</p>
								{/* <label
									htmlFor={habit.id}
									className={`${
										habit.isComplete ? 'line-through' : ''
									} capitalize`}>
									{habit.name}
								</label> */}
							</li>
						);
					})}
			</ul>
		</>
	);
}
