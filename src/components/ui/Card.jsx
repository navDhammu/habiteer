import clsx from 'clsx';

export default function Card({
	as: Component = 'div',
	variant,
	children,
	className,
}) {
	return (
		<Component
			className={clsx(
				// 'rounded-md bg-white p-4 shadow-[0px_8px_24px_rgba(149,157,165,0.2)]',
				'rounded-md bg-white p-4 drop-shadow',
				className
			)}>
			{children}
		</Component>
	);
}
