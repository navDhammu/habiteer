import { doc, onSnapshot, query, setDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import { links } from './components/Layout/Sidebar';
import { auth, db } from './firebase';
import { habitsCollection } from './firebase/firestoreReferences';
import Login from './pages/login';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [habits, setHabits] = useState([]);

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			setIsLoading(false);
			if (!user) {
				setIsLoggedIn(false);
				setHabits([]);
				return;
			}
			const isNewUser =
				user.metadata.creationTime === user.metadata.lastSignInTime;
			if (isNewUser) {
				setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
				})
					.catch((err) => console.log('error setting user doc', err))
					.finally(() => setIsLoggedIn(true));
			} else {
				setIsLoggedIn(true);
			}
		});
		return unSub;
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			const q = query(habitsCollection());
			const handler = (snapshot) => {
				snapshot.docChanges().forEach(({ type, doc }) => {
					const change = {
						id: doc.id,
						...doc.data(),
					};
					switch (type) {
						case 'added':
							setHabits((prev) => [...prev, change]);
							break;
						case 'modified':
							setHabits((prev) => {
								let filtered = prev.filter(
									(habit) => habit.id !== change.id
								);
								return [...filtered, change];
							});
							break;
						case 'removed':
							setHabits((prev) =>
								prev.filter((habit) => habit.id !== change.id)
							);
							break;
						default:
							break;
					}
				});
			};
			return onSnapshot(q, { includeMetadataChanges: true }, handler);
		}
	}, [isLoggedIn]);

	if (isLoading) return null;

	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						!isLoggedIn ? (
							<Navigate to='/login' />
						) : (
							<AppLayout habits={habits} />
						)
					}>
					<Route path='/' element={<Navigate to='/dashboard' />} />
					{links.map(({ to, Component }) => (
						<Route
							key={to}
							path={to}
							element={<Component habits={habits} />}
						/>
					))}
				</Route>
				<Route
					path='/login'
					element={
						<Login
							isLoggedIn={isLoggedIn}
							onLogin={() => setIsLoggedIn(true)}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
