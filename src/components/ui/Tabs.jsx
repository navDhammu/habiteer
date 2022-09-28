import { useState } from 'react';
import Button from './Button/Button';

export default function Tabs({ tabs, panelClassName, className }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const handleBackClick = () => setSelectedTabIndex(selectedTabIndex - 1);
	const handleNextClick = () => setSelectedTabIndex(selectedTabIndex + 1);
	const isLastTab = selectedTabIndex === tabs.length - 1;
	return (
		<div className={className}>
			<ul className='flex gap-4 border-b'>
				{tabs.map(({ tabLabel }, index) => (
					<li
						className={`pb-2 ${
							index === selectedTabIndex
								? 'border-b-2 border-b-sky-400 font-semibold text-sky-500'
								: ''
						}`}>
						<button
							type='button'
							onClick={() => setSelectedTabIndex(index)}
							className='h-full w-full capitalize'>
							{tabLabel}
						</button>
					</li>
				))}
			</ul>
			<div className={panelClassName}>{tabs[selectedTabIndex].panel}</div>
			<div className='flex justify-end gap-2'>
				<Button
					variant='secondary'
					size='sm'
					onClick={handleBackClick}
					disabled={selectedTabIndex === 0}>
					Back
				</Button>
				<Button
					variant='secondary'
					size='sm'
					onClick={handleNextClick}
					disabled={isLastTab}>
					Next
				</Button>
			</div>
		</div>
	);
}
