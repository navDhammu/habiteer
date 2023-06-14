import { useAuthContext } from 'context/AuthContext'
import { useState } from 'react'

export default function useAPIErrorHandler() {
    const [error, setError] = useState('')
    const { logoutUser } = useAuthContext()

    const errorHandler = (error: unknown) => {
        if (error instanceof Error) {
            setError(error.message)
            if (error.message === 'Unauthorized') {
                logoutUser()
            }
        } else {
            setError('unknown error')
        }
    }

    return {
        error,
        errorHandler,
    }
}
