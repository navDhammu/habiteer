import AppLayout from 'components/AppLayout';
import AuthProvider from 'context/AuthContext.tsx';
import HabitsProvider from 'context/HabitsProvider';
import PageNotFound from 'pages/404';
import AllHabitsPage from 'pages/all-habits/AllHabitsPage';
import Day from 'pages/day/Day';
import Login from 'pages/login';
import Progress from 'pages/progress/Progress';
import Signup from 'pages/signup';
import { Route, Switch } from 'wouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
   return (
      <AuthProvider>
         <HabitsProvider>
            <Switch>
               <PublicRoute path="/">
                  <Login />
               </PublicRoute>
               <PublicRoute path="/login">
                  <Login />
               </PublicRoute>
               <PublicRoute path="/signup">
                  <Signup />
               </PublicRoute>
               <PrivateRoute path="/app/today">
                  <AppLayout view={<Day />} />
               </PrivateRoute>
               <PrivateRoute path="/app/progress">
                  <AppLayout view={<Progress />} />
               </PrivateRoute>
               <PrivateRoute path="/app/habits">
                  <AppLayout view={<AllHabitsPage />} />
               </PrivateRoute>
               <Route>
                  <PageNotFound />
               </Route>
            </Switch>
         </HabitsProvider>
      </AuthProvider>
   );
}

export default App;
