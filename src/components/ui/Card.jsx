import clsx from 'clsx';

export default function Card({
	as: Component = 'div',
	variant,
	children,
	className,
}) {
	return (
		<Component
			className={clsx('rounded-md bg-white p-4 shadow', className)}>
			{children}
		</Component>
	);
}
