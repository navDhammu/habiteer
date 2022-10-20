import clsx from 'clsx';

const styles = {
	variants: {
		filled: 'bg-slate-100 hover:bg-slate-200 text-indigo-500',
		outline: 'shadow bg-white hover:border border-slate-400',
	},
	sizes: {
		sm: 'p-1',
		md: 'p-2',
		lg: 'p-3',
	},
	iconSizes: {
		sm: '16px',
		md: '20px',
		lg: '26px',
	},
	shape: {
		rounded: 'rounded-full',
		square: 'rounded-md',
	},
};

export default function IconButton({
	className,
	Icon,
	variant = '',
	shape = 'square',
	size = 'md',
	onClick,
	disabled,
	...props
}) {
	return (
		<button
			type='button'
			disabled={disabled}
			onClick={onClick}
			className={clsx(
				'transition-all disabled:pointer-events-none',
				styles.variants[variant],
				styles.shape[shape],
				styles.sizes[size],
				className
			)}
			{...props}
			>
			<Icon
				className={clsx(disabled && 'text-gray-200'), 'text-inherit'}
				size={styles.iconSizes[size]}
			/>
		</button>
	);
}
