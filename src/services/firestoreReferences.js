import { collection, doc } from '@firebase/firestore';
import { auth, db } from '.';

export const getUserDoc = () => doc(db, 'users', auth.currentUser.uid);

export const habitsCollection = () =>
	collection(db, 'users', auth.currentUser?.uid, 'habits');

export const datesCollection = () =>
	collection(db, 'users', auth.currentUser?.uid, 'dates');

export function getHabitDoc(identifier) {
	return doc(db, 'users', auth.currentUser?.uid, 'habits', identifier);
}

export function getDateDoc(date) {
	return doc(
		db,
		'users',
		auth.currentUser?.uid,
		'dates',
		typeof date === 'string' ? date : date.toDateString()
	);
}
