import { useState } from 'react'
import useAPIErrorHandler from './useAPIErrorHandler'

export default function useAPICallback<T>(fetcher: () => Promise<T>) {
    const [isLoading, setIsLoading] = useState(false)
    const { error, errorHandler } = useAPIErrorHandler()

    const callback = (onSuccess: (result: T) => void) => {
        setIsLoading(true)
        fetcher()
            .then((result) => onSuccess(result))
            .catch(errorHandler)
            .finally(() => setIsLoading(false))
    }

    return {
        callback,
        error,
        isLoading,
    }
}
