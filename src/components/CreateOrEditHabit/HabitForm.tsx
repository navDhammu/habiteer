import {
	Box,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	VStack,
	Wrap,
	WrapItem,
	Text,
} from '@chakra-ui/react';
import { IconFolder } from '@tabler/icons';
import { format } from 'date-fns';
import { useState } from 'react';
import { HabitDetails } from 'services/dbOperations';
import { ModeProps } from './index';

const today = format(new Date(), 'yyyy-MM-dd');

const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

type FormProps = ModeProps & {
	id: string;
	onSubmit: (data: Partial<HabitDetails>) => void;
};

export default function HabitForm({
	mode,
	id,
	initialValues,
	onSubmit,
}: FormProps) {
	const [errors, setErrors] = useState<{
		[Property in keyof HabitDetails]?: string;
	}>({});

	const checkCustomValidity = (form: HTMLFormElement) => {
		const isValid = new FormData(form).has('repeatDays');
		setErrors((prevErrors) => ({
			...prevErrors,
			repeatDays: isValid ? '' : 'Please select at least one day',
		}));
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const isValid = form.checkValidity();
		const isCustomValid = checkCustomValidity(form);

		if (isValid && isCustomValid) {
			const formData = new FormData(form);
			const repeatDays = formData.getAll('repeatDays') as string[];
			onSubmit({ ...Object.fromEntries(formData.entries()), repeatDays });
		}
	};

	const handleInvalid = (e: React.FormEvent) => {
		const target = e.target as HTMLFormElement;
		setErrors((prevErrors) => ({
			...prevErrors,
			[target.name]: target.validationMessage,
		}));
	};

	return (
		<Box
			as='form'
			id={id}
			onSubmit={handleSubmit}
			onInvalid={handleInvalid}
			noValidate>
			<VStack spacing='4' align='start'>
				<Heading size='sm'>
					1. {mode === 'CREATE' ? 'Choose' : 'Edit'} habit name and
					category
				</Heading>
				<FormControl isInvalid={!!errors.name}>
					<FormLabel>Habit Name</FormLabel>
					<Input
						name='name'
						placeholder='eg. Read for 30 minutes'
						onBlur={handleInvalid}
						defaultValue={initialValues?.name}
						required
					/>
					<FormErrorMessage>{errors.name}</FormErrorMessage>
				</FormControl>
				<FormControl>
					<FormLabel>
						Habit Category
						<Text as='span' ml='2' fontSize='sm' color='gray.400'>
							optional
						</Text>
					</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents='none'>
							<Icon as={IconFolder} color='gray.400' />
						</InputLeftElement>
						<Input
							name='category'
							placeholder='Choose Category'
							defaultValue={initialValues?.category}
						/>
					</InputGroup>
					{/* <FormErrorMessage>{errors.habitCategory}</FormErrorMessage> */}
				</FormControl>
			</VStack>
			<VStack spacing='4' align='start' mt='4'>
				<Heading size='sm'>
					2. {mode === 'CREATE' ? 'Create' : 'Edit'} habit repeat
					schedule
				</Heading>
				<FormControl isInvalid={!!errors.trackingStartDate}>
					<FormLabel>Start tracking from</FormLabel>
					<Input
						type='date'
						name='trackingStartDate'
						disabled={mode === 'EDIT'}
						onBlur={handleInvalid}
						defaultValue={
							initialValues?.trackingStartDate ??
							format(new Date(), 'yyyy-MM-dd')
						}
						min={today}
						required
					/>
					<FormErrorMessage>
						{errors.trackingStartDate}
					</FormErrorMessage>
				</FormControl>
				<FormControl as='fieldset' isInvalid={!!errors.repeatDays}>
					<FormLabel as='legend'>Habit repeat schedule</FormLabel>
					<Wrap spacing='4'>
						{weekdays.map((day) => (
							<WrapItem key={day}>
								<Checkbox
									colorScheme='green'
									name='repeatDays'
									value={day}
									onChange={(e) =>
										checkCustomValidity(e.target.form)
									}
									defaultChecked={
										initialValues?.repeatDays.includes(
											day
										) ?? true
									}>
									{day}
								</Checkbox>
							</WrapItem>
						))}
					</Wrap>
					<FormErrorMessage>{errors.repeatDays}</FormErrorMessage>
				</FormControl>
			</VStack>
		</Box>
	);
}
