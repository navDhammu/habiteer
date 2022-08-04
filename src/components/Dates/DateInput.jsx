import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import InputField from '../Input/InputField';

export default function DateInput(props) {
	const inputRef = useRef(null);
	const handleChange = (e) => props.onDateChange(e.target.value);
	const handleClear = () => {
		props.onDateChange('');
		inputRef.current.focus();
	};

	return (
		<InputField
			ref={inputRef}
			iconLeft={CalendarIcon}
			iconRight={ChevronDownIcon}
			onChange={handleChange}
			// onClear={handleClear}
			onClear={'sdfsdf'}
			placeholder='Select Date'
			{...props}
			// helperText={isToday(strToDate())}
		/>
	);
}
