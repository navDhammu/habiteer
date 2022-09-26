import { IconPlus } from '@tabler/icons';
import { format } from 'date-fns';
import { useState } from 'react';
import { createHabit, editHabit } from '../../firebase/dbOperations';
import useForm from '../../hooks/useForm';
import { toISOFormat } from '../../utils/dates';
import Button from '../Button/Button';
import Checkbox from '../Input/Checkbox';
import InputField from '../Input/InputField';
import InputFieldDropdown from '../Input/InputFieldDropdown';
import InputGroup from '../Input/InputGroup';

const DATE_FORMAT = 'yyyy-MM-dd';

const initialEmptyValues = {
	habitName: '',
	habitDescription: '',
	habitCategory: '',
	trackingStartDate: toISOFormat(new Date()),
	repeatDays: [
		{ id: 0, name: 'Sunday', checked: true },
		{ id: 1, name: 'Monday', checked: true },
		{ id: 2, name: 'Tuesday', checked: true },
		{ id: 3, name: 'Wednesday', checked: true },
		{ id: 4, name: 'Thursday', checked: true },
		{ id: 5, name: 'Friday', checked: true },
		{ id: 6, name: 'Saturday', checked: true },
	],
};

const customValidations = {
	repeatDays: {
		isValid(data) {
			return data.some(({ checked }) => checked);
		},
		message: 'At least one day must be selected',
	},
};

const onSubmit = (mode, onClose) => (data) => {
	switch (mode) {
		case 'CREATE':
			return createHabit(data).then(onClose);
		case 'EDIT':
			return editHabit(data).then(onClose);
		default:
			throw new Error(`invalid mode ${mode}`);
	}
};

export default function HabitForm({ mode = 'CREATE', initialValues, onClose }) {
	const {
		data: formData,
		errors,
		handleChange,
		handleInvalid,
		handleSubmit,
		isSubmitting,
	} = useForm({
		initialValues: initialValues || initialEmptyValues,
		customValidations,
		onSubmit: onSubmit(mode, onClose),
	});

	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

	return (
		<form onSubmit={handleSubmit} className='my-4 flex flex-col gap-4'>
			<section className='space-y-2'>
				<h2 className='text-base font-semibold'>Habit Name</h2>
				<InputField
					id='habit-name'
					label='Habit Name'
					placeholder='eg. Read for 30 minutes'
					value={formData.habitName}
					onChange={handleChange('habitName')}
					onInvalid={handleInvalid('habitName')}
					errorMsg={errors.habitName}
					required
				/>

				<InputFieldDropdown
					label='habit category'
					placeholder='Choose Category'
					listName='categories'
					options={['Health and fitness', 'Career', 'Personal']}
					value={formData.habitCategory}
					onChange={handleChange('habitCategory')}
					onInvalid={handleInvalid('habitCategory')}
					errorMsg={errors.habitCategory}
					required
				/>

				{!isDescriptionExpanded ? (
					<Button
						variant='tertiary'
						size='sm'
						IconRight={IconPlus}
						onClick={() => setIsDescriptionExpanded(true)}>
						add description
					</Button>
				) : (
					<InputField
						as='textarea'
						label='description'
						placeholder='Write a description or a note'
						value={formData.habitDescription}
						onChange={handleChange('habitDescription')}
					/>
				)}
			</section>
			<section className='space-y-2'>
				<h2 className='text-base font-semibold'>Habit Schedule</h2>
				<InputField
					id='start date'
					type='date'
					disabled={mode === 'EDIT'}
					label='Start tracking from'
					value={formData.trackingStartDate}
					onChange={handleChange('trackingStartDate')}
					onInvalid={handleInvalid('trackingStartDate')}
					min={format(new Date(), DATE_FORMAT)}
					required
					errorMsg={errors.trackingStartDate}
				/>
				<div className='flex'>
					<InputGroup
						heading='Weekly Repeat Cycle'
						isRequired
						errorMsg={errors.repeatDays}>
						{formData.repeatDays.map(({ id, name, checked }) => (
							<Checkbox
								key={id}
								label={name}
								name={name}
								checked={checked}
								onChange={handleChange('repeatDays')}
							/>
						))}
					</InputGroup>
				</div>
			</section>
			<footer className='flex gap-2'>
				<Button type='submit' variant='primary' disabled={isSubmitting}>
					{mode === 'CREATE' ? 'Save Habit' : 'Save Changes'}
				</Button>
				<Button variant='tertiary' onClick={onClose}>
					cancel
				</Button>
			</footer>
		</form>
	);
}
