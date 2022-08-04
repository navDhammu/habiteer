import Button from '../../Button/Button';
import InputField from '../../Input/InputField';
import InputFieldDropdown from '../../Input/InputFieldDropdown';
import Label from '../../Input/Label';
import StepHeader from './StepHeader';

const CATEGORY_OPTIONS = ['Health and fitness', 'Career', 'Personal'];

export default function NameDescription({ data, onTextInput, onInput }) {
	const { habitName, habitCategory, habitDescription } = data;
	return (
		<>
			<StepHeader step='1' />
			<div className='flex w-full gap-4'>
				<InputField
					classnames='flex-1'
					id='habit-name'
					label='Habit Name'
					placeholder='eg. Read for 30 minutes'
					value={habitName.value}
					onChange={onInput('habitName')}
					errorMsg={habitName.error}
					isRequired
				/>
				<div className='flex w-max flex-col'>
					<Label as='h2'>Habit icon</Label>
					<Button variant='tertiary' size='sm'>
						Select
					</Button>
				</div>
			</div>
			<div className='flex w-full gap-4'>
				<InputFieldDropdown
					classnames='w-4/5'
					label='habit category'
					placeholder='Choose Category'
					listName='categories'
					options={CATEGORY_OPTIONS}
					value={habitCategory.value}
					onChange={onInput('habitCategory')}
					errorMsg={habitCategory.error}
					isRequired
				/>
			</div>

			<InputField
				as='textarea'
				label='description'
				placeholder='Write a description or a note'
				onChange={onInput('habitDescription')}
			/>
		</>
	);
}
