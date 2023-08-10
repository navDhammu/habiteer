import { AbsoluteCenter } from '@chakra-ui/react';
import AppLayout from 'components/AppLayout';
import WorkInProgress from 'components/WorkInProgress';
import AuthProvider from 'context/AuthContext.tsx';
import HabitsProvider from 'context/HabitsProvider';
import PageNotFound from 'pages/404';
import AllHabitsPage from 'pages/all-habits/AllHabitsPage';
import Day from 'pages/day/Day';
import LoginPage from 'pages/login';
import { Route, Switch } from 'wouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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
               <PrivateRoute path="/app/today">
                  <AppLayout view={<Day />} />
               </PrivateRoute>
               <PrivateRoute path="/app/stats">
                  <AppLayout
                     view={
                        <AbsoluteCenter>
                           {' '}
                           <WorkInProgress />
                        </AbsoluteCenter>
                     }
                  />
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
