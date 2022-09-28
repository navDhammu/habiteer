import Button from './Button';

export default function AlertModal({
	variant,
	heading,
	body,
	confirmButton,
	onCloseModal,
}) {
	return (
		<div className='absolute top-1/2 left-1/2 flex h-44 w-96 min-w-max -translate-y-1/2 -translate-x-1/2 transform flex-col justify-between rounded-lg bg-white p-4'>
			<h1 className='text-xl'>{heading}</h1>
			<p>{body}</p>
			<div className='flex gap-4 self-end'>
				<Button size='sm' variant='tertiary' onClick={onCloseModal}>
					cancel
				</Button>
				<Button size='sm' variant='primary' onClick={onCloseModal}>
					cancel
				</Button>
			</div>
		</div>
	);
}
