import { IconCheck, IconMenu2 } from '@tabler/icons';

export default function HabitTodoList({ habits, onCheckboxToggle, heading }) {
	return (
		<>
			{/* <h2 className='font-semibold capitalize text-slate-800'>
				{heading}
			</h2> */}
			<ul className='flex flex-col gap-3'>
				{habits
					.sort((a, b) => a.name < b.name && -1)
					.map((habit) => {
						return (
							<li
								key={habit.id}
								className='flex items-center space-x-2 rounded-md border border-slate-200 bg-white p-4 shadow-sm'>
								<IconMenu2 className='inline h-4 cursor-move text-gray-300' />
								<div className='relative h-5 w-5'>
									<input
										type='checkbox'
										id={habit.id}
										checked={habit.isComplete}
										className='absolute h-full w-full appearance-none rounded-full border border-slate-200 checked:bg-indigo-500'
										onChange={onCheckboxToggle(habit.id)}
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
