import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { links } from './components/layout/sidebar';
import Login from './pages/login';
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
					path='/'
					element={
						!user ? (
							<Navigate to='/login' />
						) : (
							<AppLayout user={user} />
						)
					}>
					{links.map(({ to, Component }) => (
						<Route key={to} path={to} element={<Component />} />
					))}
				</Route>
				<Route path='/login' element={<Login user={user} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
