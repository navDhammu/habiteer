import { useContext } from 'react'

const useValidContext = <T>(context: React.Context<T>) => {
    const contextValue = useContext(context)
    if (contextValue === null)
        throw new Error(`context must be used within provider`)
    return contextValue
}

export default useValidContext
