import { ReactNode, useState } from 'react'
import { User } from 'types/User'
import { AuthContext } from './context/AuthContext'

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

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
