import {
   collection,
   CollectionReference,
   doc,
   DocumentReference,
} from '@firebase/firestore';
import { auth, firestore } from 'lib';
import { DateDoc, HabitsDoc } from 'types/firestoreDocTypes';

// needs to be a function because currentUser is null at page load
const getUserDocPath = () => `users/${auth.currentUser?.uid}`;

const collectionPaths = {
   dates: 'dates',
   habits: 'habits',
};

type CollectionName = keyof typeof collectionPaths;

function getColRef<T>(name: CollectionName) {
   return collection(
      firestore,
      `${getUserDocPath()}/${collectionPaths[name]}`
   ) as CollectionReference<T>;
}

function getDocRef<T>(name: CollectionName, docId: string) {
   return doc(
      firestore,
      `${getUserDocPath()}/${collectionPaths[name]}/${docId}`
   ) as DocumentReference<T>;
}

//habits reference helpers
export const habitsColRef = () => getColRef<HabitsDoc>('habits');
export const habitsDocRef = (docId: string) =>
   getDocRef<HabitsDoc>('habits', docId);

//dates reference helpers
export const datesColRef = () => getColRef<DateDoc>('dates');
export const datesDocRef = (docId: string) =>
   getDocRef<DateDoc>('dates', docId);
