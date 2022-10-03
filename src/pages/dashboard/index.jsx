import { IconChecks, IconFolders, IconSun } from '@tabler/icons';
import { useOutletContext } from 'react-router';
import StatCard from './StatCard';

export default function Dashboard() {
	const habits = useOutletContext();
	const totalCompletions = habits.reduce(
		(prev, curr) => prev + curr.completions,
		0
	);
	const totalCategories = new Set(habits.map((habit) => habit.habitCategory))
		.size;

	// const totalPossibleCompletions = habits.reduce((prev, curr) => {
	// 	const startDate = parse(
	// 		curr.trackingStartDate,
	// 		'yyyy-MM-dd',
	// 		new Date()
	// 	);
	// 	let diff = differenceInDays(new Date(), startDate);
	// 	if (diff === 0) diff += 1;
	// 	return prev + diff;
	// }, 0);

	return (
		<main className='p-4 md:p-6 lg:p-8'>
			<h1 className='text-3xl text-gray-700'>Dashboard</h1>
			<section className='my-8 flex max-w-2xl flex-col gap-4 sm:flex-row'>
				<StatCard icon={IconSun} title='Habits' stat={habits.length} />
				<StatCard
					icon={IconChecks}
					title='Completions'
					stat={totalCompletions}
				/>
				<StatCard
					icon={IconFolders}
					title='Categories'
					stat={totalCategories}
				/>
			</section>
			{/* <Today habits={habits} /> */}
			{/* <section className='flex flex-col gap-4 sm:flex-row'>
				<Card
					className='flex-grow'
					heading='Habits by Category'
					variant='chart'>
					<ResponsiveContainer width={400} height={400}>
						<PieChart width={1000} height={600}>
							<Pie
								data={data01}
								dataKey='value'
								nameKey='name'
								outerRadius={50}
								fill='#8884d8'
								label={({ name }) => name}
							/>
						</PieChart>
					</ResponsiveContainer>
					<p>This chart is coming soon</p>
				</Card>
				<Card
					className='flex-grow'
					heading='Categories'
					variant='chart'>
					<IconChartPie size='100' color='rgb(165 180 252)' />
					<p>This chart is coming soon</p>
				</Card>
			</section> */}
		</main>
	);
}
