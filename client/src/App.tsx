import AppLayout from 'components/layout/AppLayout'
import { createContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import PageNotFound from 'pages/404'
import Dashboard from 'pages/dashboard'
import Login from 'pages/login'
import Today from 'pages/today'
import { User } from 'types/User'
import PrivateRoute from './PrivateRoute'
import { Habit } from 'types/Habit'
import useAPIError from 'hooks/useAPIError.ts'
import habitsAPI from './api/habitsAPI.ts'

type AuthContextType = {
    user: User | null
    updateUser: (user: User | null) => void
}

type HabitsState = {
    habits: Habit[]
    isLoading: boolean
    error: string
}

type HabitsContextType = HabitsState & {}

export const AuthContext = createContext<AuthContextType | null>(null)
export const HabitsContext = createContext<HabitsContextType>(
    {} as HabitsContextType
)

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

function App() {
    const [user, setUser] = useState<User | null>(getUserFromLocalStorage)
    const [habits, setHabits] = useState<HabitsState>({
        habits: [],
        isLoading: false,
        error: '',
    })
    const handleAPIError = useAPIError()

    useEffect(() => {
        if (user) {
            setHabits((prevHabits) => ({ ...prevHabits, isLoading: true }))
            habitsAPI
                .getAll()
                .then((habits) => {
                    setHabits((prevHabits) => ({
                        ...prevHabits,
                        isLoading: false,
                        habits,
                    }))
                })
                .catch((error) => handleAPIError(error))
        }
    }, [user])

    const updateUser: AuthContextType['updateUser'] = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            <HabitsContext.Provider value={habits}>
                <Switch>
                    <Route path="/">
                        {user ? <Redirect to="/app/dashboard" /> : <Login />}
                    </Route>
                    <Route path="/login">
                        {user ? <Redirect to="/app/dashboard" /> : <Login />}
                    </Route>
                    <PrivateRoute path="/app/dashboard">
                        <AppLayout view={<Dashboard />} />
                    </PrivateRoute>
                    <PrivateRoute path="/app/today">
                        <AppLayout view={<Today />} />
                    </PrivateRoute>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </HabitsContext.Provider>
        </AuthContext.Provider>
    )
}

export default App
