import clsx from 'clsx';

const styles = {
	variants: {
		filled: 'bg-slate-100 hover:bg-slate-200',
		outline: 'border hover:border-sky-500',
	},
	sizes: {
		sm: 'p-1',
		md: 'p-2',
		lg: 'p-3',
	},
	iconSizes: {
		sm: '14px',
		md: '20px',
		lg: '26px',
	},
	// shape: {
	// 	rounded: 'rounded-full',
	// 	square: 'border',
	// },
};

export default function IconButton({
	className,
	Icon,
	variant = '',
	// shape = 'rounded',
	size = 'md',
	onClick,
	disabled,
}) {
	return (
		<button
			type='button'
			disabled={disabled}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			className={clsx(
				'rounded-full transition-all disabled:pointer-events-none',
				styles.variants[variant],
				// styles.shape[shape],
				styles.sizes[size],
				className
			)}>
			<Icon
				className={clsx('text-slate-500', disabled && 'text-gray-200')}
				size={styles.iconSizes[size]}
			/>
		</button>
	);
}
