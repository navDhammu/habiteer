import { deleteDoc } from '@firebase/firestore';
import { format } from 'date-fns';
import { useReducer } from 'react';
import { createHabit, editHabit } from '../../firebase/dbOperations';
import { getHabitDoc } from '../../firebase/firestoreReferences';
import Footer from './Footer';
import Header from './Header';
import { reducer } from './reducer';
import Goal from './steps/Goal';
import NameDescription from './steps/NameDescription';
import Schedule from './steps/Schedule';
import { validations } from './validations';

const INITIAL_FORM_DATA = [
	{ habitName: '', habitDescription: '', habitCategory: '', step: 1 },
	{
		trackingStartDate: format(new Date(), 'yyyy-MM-dd', new Date()),
		repeatDays: [1, 2, 3, 4, 5, 6, 0],
		step: 2,
	},
	{
		goalStartDate: '',
		goalEndDate: '',
		step: 3,
	},
];

function initState(data) {
	return INITIAL_FORM_DATA.reduce(
		(prev, current) => {
			const { step, ...fields } = current;
			const next = { ...prev, [step]: {} };
			for (let [key, value] of Object.entries(fields)) {
				next[step][key] = {
					value: data?.[key] || value,
					isTouched: false,
					error: null,
				};
			}
			next[step].isFirstRender = true;
			return next;
		},
		{ currentStep: 1 }
	);
}

export default function HabitForm({ data = null, onClose }) {
	const [formData, dispatch] = useReducer(reducer, data, initState);

	const mode = data ? 'edit' : 'create';
	const isEditMode = data ? true : false;

	const { currentStep, ...steps } = formData;

	const isStepValid = (step) => {
		const entries = Object.entries(formData[step]);
		if (
			entries.some(([key, data]) => {
				const { value, isTouched, error } = data;
				const isRequired = validations[key]?.isRequired;
				return error || (isRequired && !isTouched && !value);
			})
		) {
			return false;
		} else {
			return true;
		}
	};
	const stepNumbers = Object.keys(steps).map((step) => parseInt(step));
	const completedSteps = stepNumbers.filter((num) => isStepValid(num));
	const isEveryStepComplete = stepNumbers.every((num) =>
		completedSteps.includes(num)
	);
	const isStepComplete = (step) => completedSteps.includes(step);

	const handleInput = (step) => (key) => (arg) => {
		let value;
		if (arg instanceof Date) {
			value = format(arg, 'yyyy-MM-dd', new Date());
		} else if (arg.target) {
			value = arg.target.value;
		}
		dispatch({
			type: 'INPUT',
			payload: { step, key, value },
		});
	};

	const handleMultiSelect = (step) => (key) => (e) => {
		dispatch({
			type: 'MULTI_SELECT',
			payload: {
				step,
				key,
				change: {
					value: parseInt(e.target.value),
					checked: e.target.checked,
				},
			},
		});
	};
	const handleStepChange = (newStep) => {
		dispatch({ type: 'STEP_CHANGE', payload: { newStep } });
	};

	const views = stepNumbers.map((step) => {
		const complete = isStepComplete(step);
		const tabData = {
			step,
			firstRender: formData[step].isFirstRender,
			selected: step === currentStep,
			complete,
			error: !complete,
		};
		const componentProps = {
			data: formData[currentStep],
			onInput: handleInput(currentStep),
		};
		switch (step) {
			case 1:
				return {
					component: <NameDescription {...componentProps} />,
					tab: {
						label: 'Name',
						...tabData,
					},
				};
			case 2:
				return {
					component: (
						<Schedule
							{...componentProps}
							onMultiSelect={handleMultiSelect(2)}
						/>
					),
					tab: {
						label: 'Schedule',
						...tabData,
					},
				};
			case 3:
				return {
					component: <Goal {...componentProps} />,
					tab: {
						label: 'Goal',
						...tabData,
					},
				};

			default:
				break;
		}
	});

	const { component: currentComponent } = views.find(
		(view) => view.tab.step === currentStep
	);

	const handleDeleteHabit = () => {
		deleteDoc(getHabitDoc(data.id)).then(() => console.log('deleted'));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let habitDetails = {};
		Object.values(steps).forEach(({ isFirstRender, ...keys }) => {
			Object.entries(keys).forEach(
				([key, { value }]) => (habitDetails[key] = value)
			);
		});

		switch (mode) {
			case 'create':
				createHabit(habitDetails)
					.then(onClose)
					.catch((err) => console.log(err));
				break;
			case 'edit':
				editHabit(data.id, habitDetails)
					.then(onClose)
					.catch((err) => console.log(err));
				break;

			default:
				break;
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='absolute top-1/2 left-1/2 my-4 w-[500px] -translate-x-1/2 -translate-y-1/2 transform overflow-scroll rounded-lg bg-white p-6'>
			<Header
				heading={isEditMode ? 'Edit Habit' : 'Create New Habit'}
				onXClick={onClose}
				tabs={views.map((view) => view.tab)}
				onTabClick={handleStepChange}
			/>
			<section className='mt-4 mb-6 flex h-[400px] flex-col gap-4 px-10'>
				{currentComponent}
			</section>
			<Footer
				mode={mode}
				onDeleteClick={handleDeleteHabit}
				currentStep={currentStep}
				onStepChange={handleStepChange}
				submitDisabled={!isEveryStepComplete}
				submit={isEditMode ? 'Save Changes' : 'Save Habit'}
			/>
		</form>
	);
}
