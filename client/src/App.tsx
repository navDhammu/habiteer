import AppLayout from 'components/layout/AppLayout'
import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import PageNotFound from 'pages/404'
import Dashboard from 'pages/dashboard'
import Login from 'pages/login'
import Today from 'pages/today'
import { User } from 'types/User'

export type HandleUserUpdate = (user: User) => void

function App() {
    const [user, setUser] = useState<User | null>(null)

    const handleUserUpdate: HandleUserUpdate = (user) => {
        setUser(user)
    }

    return (
        <Switch>
            <Route path="/">
                <div>first route</div>
            </Route>
            <Route path="/login">
                {user ? (
                    <Redirect to="/app/dashboard" />
                ) : (
                    <Login onLogin={handleUserUpdate} />
                )}
            </Route>
            <Route path="/app/dashboard">
                <AppLayout view={<Dashboard />} />
            </Route>
            <Route path="/app/today">
                <AppLayout view={<Today />} />
            </Route>
            {/* <Route path="/app/habits">
                <AppLayout view={<AllHabits />} />
            </Route> */}
            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default App
