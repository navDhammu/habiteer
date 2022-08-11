import { CheckIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
// import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { AiOutlineExclamation } from 'react-icons/ai';

const tabStyles = {
	li: {
		selected: 'border-b-2 border-indigo-500 text-indigo-500',
		firstRender: 'text-gray-400',
		getStyles(conditions) {
			return this[getFirstTrue(Object.keys(this), conditions)];
		},
	},
	indicatorBorder: {
		firstRender: 'border-gray-400',
		complete: 'border-green-500 bg-white',
		error: 'border-red-500 bg-white',
		selected: 'border-indigo-500',
		getStyles(conditions) {
			const { firstRender, selected } = conditions;
			if (firstRender) {
				return selected ? this.selected : this.firstRender;
			}
			return this[getFirstTrue(Object.keys(this), conditions)];
		},
	},
	indicatorIcon: {
		complete: <CheckIcon className='w-5 font-bold text-green-500' />,
		error: <AiOutlineExclamation className='w-6 text-red-500' />,
		getStyles({ firstRender, complete }) {
			if (firstRender) return null;
			return complete ? this.complete : this.error;
		},
	},
};

export default function Header({ tabs, onTabClick, heading }) {
	return (
		<header className='py-4'>
			<h1 className='ml-8 flex items-center gap-2 text-xl capitalize'>
				{heading}
			</h1>
			<ol className='flex border-b-2 text-sm'>
				{tabs.map((tabData) => {
					const { label, step, onClick, ...conditions } = tabData;
					const { li, indicatorBorder, indicatorIcon } = tabStyles;

					return (
						<li
							key={step}
							className={clsx(
								'-mb-[2px] flex-1',
								li.getStyles(conditions)
							)}>
							<button
								type='button'
								onClick={() => onTabClick(step)}
								className={clsx(
									'flex h-full w-full cursor-pointer items-center justify-center gap-2 py-2'
								)}>
								<span
									className={clsx(
										'flex h-4 w-4 items-center justify-center rounded-full border',
										indicatorBorder.getStyles(conditions)
									)}>
									{indicatorIcon.getStyles(conditions)}
								</span>
								<span>{label}</span>
							</button>
						</li>
					);
				})}
			</ol>
		</header>
	);
}

//helper
function getFirstTrue(keys, obj) {
	for (let key of keys) {
		if (obj[key] === true) return key;
	}
}
