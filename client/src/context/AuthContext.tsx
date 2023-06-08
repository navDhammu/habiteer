import useValidContext from 'hooks/useValidContext'
import { createContext } from 'react'
import { User } from 'types/User'

export type AuthContextType = {
    user: User | null
    loginUser: (user: User) => void
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => useValidContext(AuthContext)
