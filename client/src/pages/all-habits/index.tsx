import { useHabitsContext } from 'context/HabitsContext'
import HabitCard from './HabitCard'

export default function AllHabitsPage() {
    const { habits } = useHabitsContext()

    return (
        <div>
            <ul>
                {habits.map((habit) => (
                    <li>
                        <HabitCard {...habit} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
