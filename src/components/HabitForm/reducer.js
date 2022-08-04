import { validateField, validations } from './validations';

export function reducer(state, { type, payload }) {
	const { currentStep } = state;
	const currentData = { ...state[currentStep] };

	const getStateOnInput = (...data) => {
		const obj = {};
		for (let [key, value] of data) {
			obj[key] = {
				value,
				isTouched: true,
				error: validateField(key, value),
			};
		}
		return {
			...state,
			[currentStep]: {
				...state[currentStep],
				...obj,
			},
		};
	};

	switch (type) {
		case 'INPUT': {
			const { key, value } = payload;

			// if (key === 'trackingStartDate') {
			// 	let endDateValue = currentData.trackingEndDate.value;
			// 	const validate = validateField(key, value, endDateValue);
			// 	return getStateOnInput([key, value], ['trackingEndDate', null]);
			// }
			// if (key === 'trackingEndDate') {
			// 	let startDateValue = currentData.trackingStartDate.value;
			// 	return getStateOnInput(
			// 		[key, value],
			// 		['trackingStartDate', startDateValue]
			// 	);
			// }

			return getStateOnInput([key, value]);
		}
		case 'MULTI_SELECT': {
			const { step, key, change } = payload;
			let selected = [...state[step][key].value];

			if (change.checked) {
				selected.push(change.value);
			} else {
				selected = selected.filter((el) => el !== change.value);
			}
			console.log(selected);
			return getStateOnInput([key, selected]);
			return {
				...state,
				[step]: {
					...state[step],
					[key]: {
						value: selected,
						isTouched: true,
						error: validateField(key, selected),
					},
				},
			};
		}

		case 'STEP_CHANGE': {
			const { newStep } = payload;

			if (currentData.isFirstRender) {
				currentData.isFirstRender = false;
			}

			//validate current step
			for (let [key, { value, error }] of Object.entries(currentData)) {
				if (!error && validations[key]?.isRequired)
					currentData[key].error = validateField(key, value);
			}

			return {
				...state,
				[currentStep]: currentData,
				currentStep: newStep,
			};
		}
		default:
			throw new Error(`invalid action: ${type}`);
	}
}
