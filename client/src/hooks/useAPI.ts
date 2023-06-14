import { useEffect, useState } from 'react'
import useAPIErrorHandler from './useAPIErrorHandler'

type Options = {
    dependency?: React.DependencyList
    condition?: boolean
}

export default function useAPI<T>(
    fn: () => Promise<T>,
    options: Options = {
        dependency: [],
        condition: true,
    }
) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { error, errorHandler } = useAPIErrorHandler()

    useEffect(() => {
        if (options.condition) {
            fn()
                .then((data) => setData(data))
                .catch(errorHandler)
                .finally(() => setIsLoading(false))
        }
    }, options.dependency)

    return { data, isLoading, error }
}
