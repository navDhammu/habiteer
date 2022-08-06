import ComingSoon from '../../components/ComingSoon';

export default function Stats({ habits }) {
	return (
		<main className='h-full'>
			<ComingSoon />
		</main>
	);
	// const [tab, setTab] = useState('week');
	// const [date, setDate] = useState(new Date());

	// const formatWeekStart = format(
	// 	startOfWeek(date, { weekStartsOn: 1 }),
	// 	'eee, MMMM dd'
	// );
	// const formatWeekEnd = format(
	// 	endOfWeek(date, { weekStartsOn: 1 }),
	// 	'eee, MMMM dd'
	// );

	// const handlePrevClick = () => {
	// 	switch (tab) {
	// 		case 'week':
	// 			return setDate(subWeeks(date, 1));
	// 		default:
	// 			break;
	// 	}
	// };
	// const handleNextClick = () => {
	// 	switch (tab) {
	// 		case 'week':
	// 			return setDate(addWeeks(date, 1));
	// 		default:
	// 			break;
	// 	}
	// };

	// return (
	// 	<section className='rounded-2xl p-4'>
	// 		<header>
	// 			<Tabs
	// 				tabs={['week', 'month', 'year', 'all-time']}
	// 				selectedTab={tab}
	// 				onTabClick={(tab) => setTab(tab)}
	// 			/>
	// 			<div className='mt-4 flex items-center gap-2'>
	// 				<IconButton
	// 					Icon={ChevronLeftIcon}
	// 					onClick={handlePrevClick}
	// 				/>
	// 				<IconButton
	// 					Icon={ChevronRightIcon}
	// 					onClick={handleNextClick}
	// 				/>
	// 				<h2 className='text-lg font-semibold'>
	// 					{formatWeekStart} - {formatWeekEnd}
	// 				</h2>
	// 			</div>
	// 		</header>
	// 		<div className='my-4 h-3 rounded-full bg-slate-200'></div>
	// 		{tab !== 'week' ? 'no data' : <Week habits={habits} />}
	// 	</section>
	// );
}
