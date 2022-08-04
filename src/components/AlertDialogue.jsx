import Button from './Button/Button';
import Modal from './Modal';

export default function AlertDialogue({
	type,
	heading,
	body,
	onConfirm,
	confirmLabel,
	onCancel,
}) {
	return (
		<Modal onClose={onCancel}>
			<div className='relative flex h-44 w-96 min-w-max flex-col justify-between rounded-lg bg-white p-4'>
				<h1 className='text-xl'>{heading}</h1>
				<p>{body}</p>
				<div className='flex gap-4 self-end'>
					<Button size='sm' variant='tertiary' onClick={onCancel}>
						cancel
					</Button>
					<Button
						size='sm'
						variant={
							type === 'destructive' ? 'primary-red' : 'primary'
						}
						onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
