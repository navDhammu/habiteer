import { endOfYesterday, isAfter } from 'date-fns';
import { stringToDate } from '../../utils/dates';

export const validations = {
	habitName: {
		isRequired: true,
	},
	habitCategory: {
		isRequired: true,
	},
	habitDescription: '',
	trackingStartDate: {
		isRequired: true,
		pattern: {
			value: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
			message: 'Invalid date format',
		},
		custom: {
			isValid: (value) => {
				const date = stringToDate(value, 'yyyy-MM-dd');
				return isAfter(date, endOfYesterday());
			},
			message: 'Start date can not be before today',
		},
	},
	repeatDays: {
		custom: {
			isValid: (days) => days.length > 0,
			message: 'Please select atleast one day',
		},
	},
	goalStartDate: new Date(),
	goalEndDate: '',
};

export function validateField(key, value, compareValue) {
	// if (!validations[key]) return null;
	const isEmpty = value?.length === 0;
	const { isRequired, pattern, custom } = validations[key];
	switch (true) {
		case isRequired && isEmpty:
			return 'This field is required';
		case pattern && !pattern.value.test(value):
			return pattern.message;
		case custom && !custom.isValid(value):
			return custom.message;
		default:
			return null;
	}
}
