export default function Tabs({ tabs, selectedTab, onTabClick }) {
	return (
		<ul className='flex gap-4 border-b'>
			{tabs.map((tab) => (
				<li
					className={`pb-2 ${
						tab === selectedTab
							? 'border-b-2 border-b-sky-400 font-semibold text-sky-500'
							: ''
					}`}>
					<button
						type='button'
						onClick={() => onTabClick(tab)}
						className='h-full w-full capitalize'>
						{tab}
					</button>
				</li>
			))}
		</ul>
	);
}
