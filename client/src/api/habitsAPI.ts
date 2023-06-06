import { Habit } from 'types/Habit'
import fetchWrapper from '.'

export default {
    getAll: async () => {
        const response = await fetchWrapper(
            'http://localhost:3000/api/habits',
            {
                credentials: 'include',
            }
        )
        return response.json() as Promise<Habit[]>
    },
}
