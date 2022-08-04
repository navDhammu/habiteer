import HabitsList from '../../components/HabitsList';

export default function Habits({ habits }) {
	return (
		<div>
			<HabitsList habits={habits} />
		</div>
	);
}
