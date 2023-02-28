import { IconChecks, IconFolders, IconSun } from '@tabler/icons';
import {
	Card,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import {
	CartesianGrid,
	LineChart,
	ResponsiveContainer,
	Line,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import Heading from '../../components/ui/Heading';
import StatCard from './StatCard';

import { format } from 'date-fns';
import { getDocs, orderBy, query } from '@firebase/firestore';
import { datesCollection } from 'services/firestoreReferences';

export default function Dashboard() {
	const habits = useOutletContext();
	const [chartData, setChartData] = useState([]);
	const [loadingChartData, setLoadingChartData] = useState(true);

	useEffect(() => {
		(async function getChartData() {
			const { docs } = await getDocs(
				query(datesCollection(), orderBy('date'))
			);
			const chartData = docs.map((doc) => {
				const { date, ...rest } = doc.data();
				const habits = Object.values(rest);
				const completedHabits = habits.filter(
					(habit) => habit.isComplete
				);
				return {
					x: date.toDate(),
					'Completion Rate':
						(completedHabits.length / habits.length) * 100,
				};
			});

			setChartData(chartData);
			setLoadingChartData(false);
		})();
	}, []);

	const totalCompletions = habits.reduce(
		(prev, curr) => prev + curr.completions,
		0
	);
	const totalCategories = new Set(habits.map((habit) => habit.habitCategory))
		.size;

	return (
		<main className='overflow-scroll pl-0 pt-4 md:p-6 lg:p-8'>
			<Heading size='lg'>Dashboard</Heading>
			<section className='my-8 flex max-w-2xl flex-col gap-4 sm:flex-row'>
				<Card bgColor='white' p='2'>
					<Stat>
						<StatLabel>Habits</StatLabel>
						<StatNumber>{habits.length}</StatNumber>
						<StatHelpText>Feb 12 - Feb 28</StatHelpText>
					</Stat>
				</Card>
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
			<Card className=''>
				<h2 className='mb-2 text-lg font-semibold text-slate-700'>
					Habit completion rate over time
				</h2>
				{loadingChartData ? (
					'loading...'
				) : (
					<ResponsiveContainer height={300}>
						<LineChart
							data={chartData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis
								tickMargin={7}
								angle={-15}
								dataKey='x'
								tickFormatter={(date) => format(date, 'MMM dd')}
							/>
							<YAxis tickFormatter={(y) => `${y}%`} />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='Completion Rate'
								stroke='#8884d8'
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</Card>
		</main>
	);
}
