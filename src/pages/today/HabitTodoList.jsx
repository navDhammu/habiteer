import { IconCheck, IconMenu2 } from '@tabler/icons';
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
								className='flex items-center space-x-2 rounded-md border border-slate-200 bg-white p-4 shadow-sm hover:bg-gray-100 '>
								<IconMenu2 className='inline h-4 cursor-move text-gray-300' />
								<div className='relative h-5 w-5'>
									<input
										type='checkbox'
										id={habit.id}
										checked={habit.isComplete}
										className='absolute h-full w-full appearance-none rounded-full border border-slate-200 checked:bg-indigo-500'
										onChange={(e) =>
											markHabitComplete(
												e.target.checked,
												habit.id,
												new Date()
											)
										}
									/>
									<IconCheck
										className='pointer-events-none absolute top-1/2 left-1/2 z-20 w-4 -translate-x-1/2 -translate-y-1/2 transform'
										color='white'
									/>
								</div>
								<label
									htmlFor={habit.id}
									className={`${
										habit.isComplete ? 'line-through' : ''
									} capitalize`}>
									{habit.name}
								</label>
							</li>
						);
					})}
			</ul>
		</>
	);
}
