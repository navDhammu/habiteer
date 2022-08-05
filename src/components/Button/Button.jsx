import clsx from 'clsx';

const SIZES = {
	sm: {
		btn: 'px-3 py-2 text-sm',
		icon: 'w-4',
	},
	md: {
		btn: 'px-4 py-3 text-md',
		icon: 'w-5',
	},
	lg: {
		btn: 'px-6 py-3 text-md',
		icon: 'w-6',
	},
};

const VARIANTS = {
	primary:
		'bg-indigo-500 text-white disabled:bg-indigo-200 hover:bg-indigo-600 active:bg-indigo-800',
	secondary:
		'border border-indigo-500 text-indigo-500 hover:bg-indigo-50 active:bg-indigo-100 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	tertiary:
		'border border-gray-400 text-gray-400 hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	text: 'text-indigo-600 hover:underline',
	'primary-red':
		'bg-red-500 text-white disabled:bg-red-200 hover:bg-red-600 active:bg-red-800',
	'secondary-red':
		'border border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	tab: 'border-b-2 pb-2',
};

export default function Button({
	type,
	IconLeft,
	IconRight,
	variant,
	size = 'md',
	onClick,
	invisible,
	disabled,
	children,
	className,
}) {
	return (
		<button
			type={type || 'button'}
			className={clsx(
				'flex items-center justify-center gap-2 rounded transition-all disabled:cursor-not-allowed',
				className,
				invisible && 'invisible',
				SIZES[size].btn,
				VARIANTS[variant]
			)}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			disabled={disabled}>
			{IconLeft && <IconLeft className={SIZES[size].icon} />}
			<span>{children}</span>
			{IconRight && <IconRight className={SIZES[size].icon} />}
		</button>
	);
}
