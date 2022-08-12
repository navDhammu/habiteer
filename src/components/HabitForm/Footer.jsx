import {
	ChevronLeftIcon,
	ChevronRightIcon,
	SaveIcon,
	TrashIcon,
} from '@heroicons/react/outline';
import Button from '../Button/Button';

export default function Footer({
	currentStep,
	onDeleteClick,
	onStepChange,
	submitDisabled,
	submit,
	mode,
}) {
	return (
		<footer className='flex flex-col justify-between gap-3 px-10'>
			<div
				className={`flex gap-2 ${
					mode === 'create' ? 'justify-end' : ''
				}`}>
				{mode === 'edit' && (
					<div className='flex-1'>
						<Button
							size='sm'
							variant='secondary-red'
							IconLeft={TrashIcon}
							// onClick={onDeleteClick}
						>
							Delete
						</Button>
					</div>
				)}
				<Button
					disabled={currentStep === 1}
					IconLeft={ChevronLeftIcon}
					variant='primary'
					size='sm'
					onClick={() => onStepChange(currentStep - 1)}>
					Back
				</Button>
				<Button
					disabled={currentStep === 3}
					IconRight={ChevronRightIcon}
					variant='primary'
					onClick={() => onStepChange(currentStep + 1)}
					size='sm'>
					Next
				</Button>
			</div>
			<div className='flex gap-4'>
				<Button
					type='submit'
					variant='primary'
					size='sm'
					iconLeft={SaveIcon}
					fullWidth
					disabled={submitDisabled}>
					{submit}
				</Button>
			</div>
		</footer>
	);
}
