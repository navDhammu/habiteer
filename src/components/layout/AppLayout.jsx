import { onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { habitsCollection } from '../../services/firestoreReferences';
import GlobalModal from '../ui/GlobalModal';
import Header from './Header';
import Sidebar from './sidebar';
import { Flex } from '@chakra-ui/react';

const SIDEBAR_BREAKPOINT = 768;

export default function AppLayout({ user }) {
	const [habits, setHabits] = useState([]);
	const [isLoadingHabits, setIsLoadingHabits] = useState(true);
	// const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

	useEffect(() => {
		if (user) {
			return onSnapshot(
				query(habitsCollection()),
				{ includeMetadataChanges: true },
				(snapshot) => {
					if (snapshot.empty) {
						setHabits([]);
						return setIsLoadingHabits(false);
					}
					snapshot.docChanges().forEach(({ type, doc }) => {
						const change = {
							id: doc.id,
							...doc.data(),
						};
						switch (type) {
							case 'added':
								setHabits((prev) => [...prev, change]);
								return setIsLoadingHabits(false);
							case 'modified':
								setHabits((prev) => {
									let filtered = prev.filter(
										(habit) => habit.id !== change.id
									);
									return [...filtered, change];
								});
								return setIsLoadingHabits(false);
							case 'removed':
								setHabits((prev) =>
									prev.filter(
										(habit) => habit.id !== change.id
									)
								);
								return setIsLoadingHabits(false);
							default:
								throw new Error(`type ${type} not found`);
						}
					});
				}
			);
		}
	}, [user]);

	return (
		<GlobalModal>
			<Flex h='100vh'>
				<Sidebar />
				<Outlet context={habits} />
			</Flex>
		</GlobalModal>
	);
}
