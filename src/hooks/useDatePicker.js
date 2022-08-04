import { useState } from 'react';
import useOnOutsideClick from './useOnOutsideClick';

export default function useDatePicker() {
	const [isCalendarShown, setIsCalendarShown] = useState(false);

	const refCallback = useOnOutsideClick(() => setIsCalendarShown(false));

	return {
		isCalendarShown,
		refCallback,
		handlers: {
			openCalendar: () => setIsCalendarShown(true),
			closeCalendar: () => {
				setIsCalendarShown(false);
			},
		},
	};
}
