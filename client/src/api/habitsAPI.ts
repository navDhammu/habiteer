import { Habit } from 'types/Habit'

export default {
    getAllHabits: async () => {
        const response = await fetch('http://localhost:3000/api/habits', {
            credentials: 'include',
        })
        if (!response.ok) throw new Error(await response.text())
        return response.json() as Promise<Habit[]>
    },
}
