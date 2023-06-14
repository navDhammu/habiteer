import useValidContext from 'hooks/useValidContext'
import { createContext } from 'react'
import { User } from 'types/User'
import { ReactNode, useState } from 'react'
import useAPICallback from 'hooks/useAPICallback'
import habitsAPI from 'src/api/habitsAPI'
import authAPI from 'src/api/authAPI'

export type AuthContextType = {
    user: User | null
    loginUser: (user: User) => void
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => useValidContext(AuthContext)

const getUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem('user')
        if (user === null) return null
        return JSON.parse(user)
    } catch (error) {
        // incase error in json parsing
        return null
    }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getUserFromLocalStorage)

    const loginUser = (user: User) => {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logoutUser = () => setUser(null)

    // const login = async (email: string, password: string) => {
    //         const user = await authAPI.login({email, password})
    //         setUser(user)
    //         localStorage.setItem('user', JSON.stringify(user))
    //     }

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
