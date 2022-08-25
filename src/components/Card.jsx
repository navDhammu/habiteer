import clsx from 'clsx';

export default function Card({ variant, children, heading, className }) {
	return (
		<div
			className={clsx('rounded-md bg-white p-4', className, {
				border: variant === 'stat',
				'shadow-md': variant === 'chart',
			})}>
			{heading && (
				<h2
					className={clsx(
						'mb-2 font-semibold',
						variant === 'stat'
							? 'text-xs uppercase tracking-wider text-gray-500'
							: 'text-lg'
					)}>
					{heading}
				</h2>
			)}
			{children}
		</div>
	);
}
