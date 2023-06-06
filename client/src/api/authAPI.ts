import { User } from 'types/User'
import fetchWrapper from '.'

export default {
    login: async (credentials: { email: string; password: string }) => {
        const response = await fetchWrapper('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
        return response.json() as Promise<User>
    },
    logout: async () => {
        await fetchWrapper('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include',
        })
        return Promise.resolve()
    },
}
