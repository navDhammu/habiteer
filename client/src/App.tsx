import AppLayout from 'components/AppLayout';
import { Route, Switch } from 'wouter';
import PageNotFound from 'pages/404';
import LoginPage from 'pages/login';
import Today from 'pages/today';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthProvider from 'context/AuthContext.tsx';
import HabitsProvider from 'context/HabitsProvider';
import AllHabitsPage from 'pages/all-habits/AllHabitsPage';
import WorkInProgress from 'components/WorkInProgress';
import { AbsoluteCenter } from '@chakra-ui/react';

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
                  <AppLayout view={<Today />} />
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
