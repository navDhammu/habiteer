import { onSnapshot, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { habitsCollection } from '../../services/firestoreReferences';
import Sidebar from './sidebar';
import { Flex, Box } from '@chakra-ui/react';

const SIDEBAR_BREAKPOINT = 768;

export type Habit = {
	id: string;
	name: string;
	category: string;
	description: string;
	trackingStartDate: string;
	repeatDays: string[];
};

export default function AppLayout({ user }) {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [isLoadingHabits, setIsLoadingHabits] = useState(true);

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
							...(doc.data() as {}),
						} as Habit;
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
		<Flex h='100vh'>
			<Sidebar />
			<Box as='main' flex='1' overflowY='scroll' p='8' bg='gray.50'>
				<Outlet context={habits} />
			</Box>
		</Flex>
	);
}
