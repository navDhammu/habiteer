import useWindowWidth from "hooks/useWindowWidth";
import PropTypes from 'prop-types';
import { useOutletContext, useParams } from "react-router";
import HabitDetails from "./HabitDetails";


const BREAKPOINT = 768

export default function HabitsWithDetailsPanel({ habitListElement }) {
    const habits = useOutletContext()
    const width = useWindowWidth()
	const { habitId } = useParams();
	const selectedHabit = habits.find((habit) => habit.id === habitId);

    if (width > BREAKPOINT) {
        return <div className='flex gap-4 h-full divide-x [&>*]:flex-1'>
                {habitListElement}
                <HabitDetails
                    habit={selectedHabit}
                />
            </div>
    }
    return selectedHabit ? <HabitDetails habit={selectedHabit} /> : habitListElement
}


HabitsWithDetailsPanel.propTypes = {
    habitListElement: PropTypes.element.isRequired
}