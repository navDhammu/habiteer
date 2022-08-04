import { FaWpforms } from 'react-icons/fa';
import { GiStairsGoal } from 'react-icons/gi';
import { AiOutlineSchedule } from 'react-icons/ai';

const info = {
	1: {
		icon: <FaWpforms size='1.5em leading-12' />,
		heading: 'Habit Name',
	},
	2: {
		icon: <AiOutlineSchedule size='1.5em leading-12' />,
		heading: 'Habit Schedule',
	},
	3: {
		icon: <GiStairsGoal size='1.5em leading-12' />,
		heading: 'Habit Goal',
	},
};
export default function StepHeader({ step }) {
	return (
		<>
			<div className='h-12 w-12 self-center rounded-full border border-sky-500 p-2 text-sky-500'>
				{info[step].icon}
			</div>
			<h2 className='text-center'>
				Step {step}. {info[step].heading}
			</h2>
			<hr />
		</>
	);
}
