import { useAuthContext } from 'context/AuthContext'

export default function useAPIError() {
    const { logoutUser } = useAuthContext()

    return (error: unknown) => {
        console.log(error)
        if (error instanceof Error) {
            if (error.message === 'Unauthorized') {
                logoutUser()
            }
        } else throw error
    }
}
