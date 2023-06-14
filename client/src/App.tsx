import AppLayout from 'components/layout/AppLayout'
import { Route, Switch } from 'wouter'
import PageNotFound from 'pages/404'
import Dashboard from 'pages/dashboard/index.tsx'
import LoginPage from 'pages/login'
import Today from 'pages/today'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AuthProvider from 'context/AuthContext.tsx'
import HabitsProvider from 'context/HabitsContext.tsx'

function App() {
    return (
        <AuthProvider>
            <HabitsProvider>
                <Switch>
                    <PublicRoute path="/">
                        <LoginPage />
                    </PublicRoute>
                    <PublicRoute path="/login">
                        <LoginPage />
                    </PublicRoute>
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
            </HabitsProvider>
        </AuthProvider>
    )
}

export default App
