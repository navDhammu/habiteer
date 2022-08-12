import {
	addDoc,
	deleteField,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	writeBatch,
} from '@firebase/firestore';
import { db } from '.';
import {
	datesCollection,
	getDateDoc,
	getHabitDoc,
	habitsCollection,
} from './firestoreReferences';

//Create new habhit
export function createHabit(habitDetails) {
	return addDoc(habitsCollection(), {
		createdOn: new Date(),
		completions: 0,
		currentStreak: 0,
		bestStreak: 0,
		...habitDetails,
	})
		.then((doc) => {
			setDoc(
				getDateDoc(new Date()),
				{
					[doc.id]: {
						name: habitDetails.habitName,
						isComplete: false,
					},
				},
				{ merge: true }
			);
		})
		.catch((err) => console.log('error', err));
}

//edit existing habit
export function editHabit(habitId, habitDetails) {
	return updateDoc(getHabitDoc(habitId), {
		lastUpdated: new Date(),
		...habitDetails,
	});
}

//delete habit
export async function deleteHabit(habitId) {
	const habitDoc = getHabitDoc(habitId);
	const q = query(datesCollection(), orderBy(`${habitId}`));
	const batch = writeBatch(db);
	const snapshot = await getDocs(q);

	snapshot.forEach((doc) => {
		batch.update(getDateDoc(doc.id), { [habitId]: deleteField() });
	});
	batch.delete(habitDoc);
	return batch.commit();
}
//archive habit
