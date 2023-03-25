import {
	addDoc,
	arrayUnion,
	deleteField,
	getDocs,
	increment,
	orderBy,
	query,
	setDoc,
	where,
	doc,
	limit,
	updateDoc,
	writeBatch,
} from '@firebase/firestore';
import { Habit } from 'components/layout/AppLayout';
import { endOfDay, startOfDay } from 'date-fns';
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

export type DateDoc = {
	date: Date;
	habits: {
		[id: string]: {
			isComplete: boolean;
			name: string;
		};
	};
};

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

export async function markHabitComplete(
	isComplete: boolean,
	habitId: string,
	docId: string
) {
	const batch = writeBatch(db);
	batch.update(getDateDoc(docId), {
		[`habits.${habitId}.isComplete`]: isComplete,
	});
	batch.update(getHabitDoc(habitId), {
		completions: increment(isComplete ? 1 : -1),
	});
	return batch.commit();
}

export async function createDateDoc(date: Date) {
	const day = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
	}).format(date);

	const querySnapshot = await getDocs(
		query(habitsCollection(), where('repeatDays', 'array-contains', day))
	);

	const habits: DateDoc['habits'] = {};

	querySnapshot.forEach((doc) => {
		habits[doc.id] = {
			name: doc.get('name'),
			isComplete: false,
		};
	});

	return addDoc<DateDoc>(datesCollection(), { date, habits });
}
