import isValid from 'date-fns/isValid';
import useDatePicker from '../hooks/useDatePicker';
import { Calendar, DateRange } from 'react-date-range';
import format from 'date-fns/format';

const DATE_FORMAT = 'yyyy/MM/dd';

const formatInputValue = ({ startDate, endDate }) => {
	if (isValid(startDate) && isValid(endDate)) {
		return `${format(startDate, DATE_FORMAT)} - ${format(
			endDate,
			DATE_FORMAT
		)}`;
	}
};

export default function RangePicker({ range, label, placeholder, onChange }) {
	const { showCalendar, refCallback, handlers } = useDatePicker();

	return (
		<div ref={refCallback}>
			{/* <DateInput
				value={formatInputValue(range)}
				label={label}
				placeholder={placeholder}
				onClick={handlers.openCalendar}
			/> */}
			{showCalendar && (
				<DateRange ranges={[range]} onChange={handlers.closeCalendar} />
			)}
		</div>
	);
}
