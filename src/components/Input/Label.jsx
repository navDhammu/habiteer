export default function Label({
	as: Component = 'label',
	isRequired,
	children,
	...props
}) {
	return (
		<Component
			className={`${
				isRequired
					? 'after:ml-1 after:text-red-400 after:content-["*"]'
					: ''
			} font-headings mb-1 text-sm capitalize`}
			{...props}>
			{children}
		</Component>
	);
}
