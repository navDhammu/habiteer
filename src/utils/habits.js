import { eachDayOfInterval, getDay, parse } from 'date-fns';

export function getHabitCompletionRate({
	trackingStartDate,
	completions,
	repeatDays,
}) {
	const totalDays = eachDayOfInterval({
		start: parse(trackingStartDate, 'yyyy-MM-dd', new Date()),
		end: new Date(),
	}).filter((date) => repeatDays.includes(getDay(date))).length;
	return completions / totalDays;
}
