import { useContext } from 'react'
import { AuthContext } from 'src/App'

export default function useAPIError() {
    const context = useContext(AuthContext)

    return (error: unknown) => {
        console.log(error)
        if (error instanceof Error) {
            if (error.message === 'Unauthorized') {
                localStorage.removeItem('user')
                context?.updateUser(null)
            }
        } else throw error
    }
}
