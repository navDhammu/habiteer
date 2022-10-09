import clsx from 'clsx';
const SIZES = {
	lg: {
		tag: 'h1',
		styles: 'text-3xl',
	},
	md: {
		tag: 'h2',
		styles: 'text-xl',
	},
	sm: {
		tag: 'h3',
		styles: 'text-base',
	},
};
export default function Heading({ size = 'md', children }) {
	const Tag = SIZES[size].tag;
	return (
		<Tag className={clsx('text-gray-700', SIZES[size].styles)}>
			{children}
		</Tag>
	);
}
