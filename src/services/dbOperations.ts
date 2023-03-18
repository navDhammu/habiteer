import {
	addDoc,
	arrayUnion,
	deleteField,
	getDocs,
	increment,
	orderBy,
	query,
	setDoc,
	updateDoc,
	writeBatch,
} from '@firebase/firestore';
import { Habit } from 'components/layout/AppLayout';
import { nanoid } from 'nanoid';
import { db } from '.';
import {
	datesCollection,
	getDateDoc,
	getHabitDoc,
	getUserDoc,
	habitsCollection,
} from './firestoreReferences';

export type HabitDetails = Omit<Habit, 'id'>;
// export interface HabitDetails {
// 	name: string;
// 	description: string;
// 	category: string;
// 	trackingStartDate: Date;
// 	repeatDays: string[];

//Create new habit
export function createHabit(
	documentFields: HabitDetails | Partial<HabitDetails>
) {
	if (
		!(
			'name' in documentFields &&
			'trackingStartDate' in documentFields &&
			'repeatDays' in documentFields
		)
	) {
		throw new Error('incorrect HabitDetails for createHabit');
	}
	return addDoc(habitsCollection(), {
		createdOn: new Date(),
		completions: 0,
		currentStreak: 0,
		bestStreak: 0,
		...documentFields,
	})
		.then((doc) => {
			setDoc(
				getDateDoc(new Date()),
				{
					[doc.id]: {
						name: documentFields.name,
						isComplete: false,
					},
				},
				{ merge: true }
			);
		})
		.catch((err) => console.log('error', err));
}

//edit existing habit
export function editHabit(
	habitId: string,
	documentFields: Partial<HabitDetails>
) {
	return updateDoc(getHabitDoc(habitId), {
		lastUpdated: new Date(),
		...documentFields,
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

export function createCategory(name) {
	return setDoc(
		getUserDoc(),
		{ categories: arrayUnion({ id: nanoid(), name }) },
		{ merge: true }
	);
}

export function markHabitComplete(isComplete, habitId, date) {
	const batch = writeBatch(db);
	batch.update(getDateDoc(date), { [`${habitId}.isComplete`]: isComplete });
	batch.update(getHabitDoc(habitId), {
		completions: increment(isComplete ? 1 : -1),
	});
	return batch.commit();
}
