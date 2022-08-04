import { PencilIcon } from '@heroicons/react/outline';
import { toStringPercent } from '../utils';
import Button from './Button/Button';
import ProgressIndicator from './ProgressIndicator';

export default function HabitCard({
	habitName,
	habitCategory,
	habitDescription,
	onEditClick,
	completionRate,
}) {
	return (
		<article className='rounded-2xl border bg-stone-100 py-4 px-6'>
			<header className='flex items-center'>
				<div className='flex-1'>
					<h2>
						<strong className='text-lg capitalize text-slate-700'>
							{habitName}
						</strong>
						<span className='ml-2 rounded-2xl border border-sky-400 bg-sky-100 px-2 py-1 text-sm capitalize'>
							{habitCategory}
						</span>
						{/* <span className='ml-4 rounded-md border border-green-500 bg-green-100 p-1 text-sm text-green-500'>
							Active
						</span> */}
					</h2>

					<h3 className='text-sm text-gray-400'>
						{habitDescription}
					</h3>
				</div>
				<Button
					variant='text'
					size='sm'
					onClick={onEditClick}
					IconLeft={PencilIcon}>
					Edit
				</Button>
			</header>
			<section className='my-4'>
				<div className='flex justify-between'>
					<h3 className='text-sm capitalize text-gray-500'>
						completion rate
					</h3>
					<span>{Math.round(completionRate * 100)} %</span>
				</div>
				<ProgressIndicator percent={toStringPercent(completionRate)} />
			</section>
		</article>
	);
}
