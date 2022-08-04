import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { format, isDate, isValid, parse } from 'date-fns';
import { useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useOnOutsideClick from '../../hooks/useOnOutsideClick';
import InputField from '../Input/InputField';

const DATE_FORMAT = 'yyyy-MM-dd';

export default function DatePicker({
	calendarClassNames = 'left-0',
	date,
	minDate,
	onInput,
	error,
	...props
}) {
	const [isCalendarShown, setIsCalendarShown] = useState(false);
	const inputRef = useRef(null);
	const refCallback = useOnOutsideClick(() => setIsCalendarShown(false));

	// const selectedDate = stringToDate(date);

	const handleCalendarDateChange = (date) => {
		onInput(date);
		setIsCalendarShown(false);
	};

	console.log(date);
	return (
		<div ref={refCallback} className='relative'>
			<InputField
				ref={inputRef}
				value={isValid(date) ? format(date, DATE_FORMAT) : date}
				onClick={() => setIsCalendarShown(true)}
				errorMsg={error}
				iconLeft={CalendarIcon}
				iconRight={ChevronDownIcon}
				onChange={onInput}
				{...props}
			/>
			{isCalendarShown && (
				<Calendar
					className={`absolute mt-2 border ${calendarClassNames}`}
					date={toCalendarDate(date)}
					onChange={handleCalendarDateChange}
					minDate={toCalendarDate(minDate)}
				/>
			)}
		</div>
	);
}

function toCalendarDate(date) {
	if (isDate(date)) return date;
	let parsed = parse(date, DATE_FORMAT, new Date());
	return isValid(parsed) ? parsed : null;
}
