import clsx from 'clsx';

const SIZES = {
	sm: {
		btn: 'px-2 py-1 text-sm',
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
		'bg-blue-500 text-white disabled:bg-indigo-200 hover:bg-indigo-600 active:bg-indigo-800',
	secondary:
		'border text-indigo-500 border-indigo-500 active:bg-indigo-200 hover:bg-white hover:text-black active:bg-indigo-500 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	'secondary-danger':
		'border text-red-400 active:bg-red-100 hover:border-slate-300 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	tertiary:
		'border text-slate-600 hover:border-slate-300 active:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 disabled:bg-gray-50',
	text: 'text-indigo-600 hover:underline',
	'text-red': 'text-indigo-600 hover:underline',
	'primary-danger':
		'bg-red-500 text-white disabled:bg-red-200 hover:bg-red-600 active:bg-red-800',
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
			onClick={onClick}
			disabled={disabled}>
			{IconLeft && <IconLeft className={SIZES[size].icon} />}
			<span>{children}</span>
			{IconRight && <IconRight className={SIZES[size].icon} />}
		</button>
	);
}
