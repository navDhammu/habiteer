import { format, isToday, parse } from 'date-fns';
import { isValidDateString } from '../../../utils/dates';
import { weekDaysArray } from '../../../utils/days';
import DatePicker from '../../Dates/DatePicker';
import Checkbox from '../../Input/Checkbox';
import InputGroup from '../../Input/InputGroup';
import StepHeader from './StepHeader';

const DATE_FORMAT = 'yyyy-MM-dd';

const getDateHelperText = (dateString) => {
	if (!isValidDateString(dateString, DATE_FORMAT)) return null;
	const date = parse(dateString, DATE_FORMAT, new Date());
	return isToday(date) ? 'Today' : format(date, 'MMM dd, yyyy');
};
export default function Schedule({ data, onMultiSelect, onInput }) {
	const { trackingStartDate, repeatDays } = data;

	return (
		<>
			<StepHeader step='2' />
			<div className='flex justify-between gap-2'>
				<DatePicker
					isRequired
					label='Starting tracking from'
					date={trackingStartDate.value}
					minDate={new Date()}
					onInput={onInput('trackingStartDate')}
					error={trackingStartDate.error}
					helperText={getDateHelperText(trackingStartDate.value)}
				/>
			</div>
			<div className='flex'>
				<InputGroup
					heading='Weekly Repeat Cycle'
					isRequired
					errorMsg={repeatDays.error}>
					{weekDaysArray.map((day, index) => (
						<Checkbox
							key={day}
							id={day}
							label={day}
							value={index}
							checked={repeatDays.value.includes(index)}
							onChange={onMultiSelect('repeatDays')}
						/>
					))}
				</InputGroup>
			</div>
		</>
	);
}
