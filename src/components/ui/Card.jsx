import clsx from 'clsx';

export default function Card({
	as: Component = 'div',
	variant,
	children,
	className,
}) {
	return (
		<Component
			className={clsx('rounded-md p-4 drop-shadow bg-white', className)}>
			{children}
		</Component>
	);
}
