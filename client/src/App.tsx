import AppLayout from 'components/layout/AppLayout'
import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import PageNotFound from 'pages/404'
import Dashboard from 'pages/dashboard'
import Login from 'pages/login'
import Today from 'pages/today'
import PrivateRoute from './PrivateRoute'
import useAPIError from 'hooks/useAPIError.ts'
import habitsAPI from './api/habitsAPI.ts'
import { useAuthContext } from './context/AuthContext.tsx'
import { HabitsContext, HabitsContextType } from './context/HabitsContext.tsx'

function App() {
    const [habits, setHabits] = useState<HabitsContextType>({
        habits: [],
        isLoading: false,
        error: '',
    })
    const { user } = useAuthContext()
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

    return (
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
    )
}

export default App
