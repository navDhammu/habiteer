import { AppContext, Habit } from 'components/layout/AppLayout';
import { HabitTodo } from 'pages/today';
import { useOutletContext } from 'react-router-dom';

export function useAppContext() {
	return useOutletContext<AppContext>();
}
