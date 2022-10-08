export default function Center({
	as: Component = 'div',
	children,
	className = '',
}) {
	return (
		<Component
			className={`absolute left-1/2 top-1/2 -translate-y-0 -translate-x-1/2 ${className}`}>
			{children}
		</Component>
	);
}
