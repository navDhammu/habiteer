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
			} mb-1 font-headings text-sm font-semibold capitalize text-gray-500`}
			{...props}>
			{children}
		</Component>
	);
}
