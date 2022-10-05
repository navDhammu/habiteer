import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import PageNotFound from './pages/404';
import AllHabits from './pages/all-habits';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Today from './pages/today';
import { auth } from './services';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => setUser(user ?? false));
	}, []);

	if (user == null) return 'loading...';

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						!user ? (
							<Navigate to='/login' />
						) : (
							<AppLayout user={user} />
						)
					}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/today' element={<Today />} />
					<Route path='/all-habits' element={<AllHabits />} />
				</Route>
				<Route path='/login' element={<Login user={user} />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
