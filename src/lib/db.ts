import { collection, doc } from '@firebase/firestore';
import { auth, firestore } from 'lib';

type CollectionNames = 'dates' | 'habits';

export const db = {
   collections: {
      dates: 'dates',
      habits: 'habits',
   },
   getUserDocPath: () => `users/${auth.currentUser.uid}`,
   getColRef(collectionName: CollectionNames) {
      return collection(
         firestore,
         `${this.getUserDocPath()}/${this.collections[collectionName]}`
      );
   },
   getDocRef(collectionName: CollectionNames, docId: string) {
      return doc(
         firestore,
         `${this.getUserDocPath()}/${this.collections[collectionName]}/${docId}`
      );
   },
};
