import clsx from 'clsx';
import Button from '../Button/Button';

export default function AlertDialogue({
	variant,
	body,
	onConfirm,
	confirmBtnLabel,
	onCancel,
}) {
	return (
		<div className='mt-3 space-y-3'>
			<p>{body}</p>
			<div className='flex gap-4 self-end'>
				<Button
					size='sm'
					onClick={onConfirm}
					variant={clsx({
						'primary-danger': variant === 'danger',
						primary: variant === 'info',
					})}>
					{confirmBtnLabel}
				</Button>
				<Button size='sm' onClick={onCancel} variant='tertiary'>
					cancel
				</Button>
			</div>
		</div>
	);
}
