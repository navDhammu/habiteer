import { User } from 'types/User'

export default {
    login: async (
        credentials: { email: string; password: string },
        onSuccess: (user: User) => void,
        onError: (e: string) => void
    ) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })
            if (!response.ok) return onError(await response.text())
            const user = (await response.json()) as User
            onSuccess(user)
        } catch (error) {
            console.log(error)
            onError('Something went wrong, please try again later')
        }
    },
    logout: async () => {},
}
