import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Read config from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export { firebaseConfig };

export const appId = import.meta.env.VITE_APP_ID || 'default-app-id';

// Initialize Firebase
if (!firebaseConfig.apiKey) {
  console.error('Firebase: Missing API key. Please check your .env.local file.');
}

import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';

// Function to handle the custom authentication token
// export async function authenticateWithToken(): Promise<User> {
//   ... (removed)
// }

// Function to get a document reference for private user data
export function getPrivateDocRef(collectionPath: string, docId: string) {
  const userId = auth.currentUser?.uid || 'anonymous';
  const fullCollectionPath = `/artifacts/${appId}/users/${userId}/${collectionPath}`;
  return doc(db, fullCollectionPath, docId);
}

// Function to get a collection reference for private user data
export function getPrivateCollectionRef(collectionPath: string) {
  const userId = auth.currentUser?.uid || 'anonymous';
  const fullCollectionPath = `/artifacts/${appId}/users/${userId}/${collectionPath}`;
  return collection(db, fullCollectionPath);
}

// Function to get a document reference for public data
export function getPublicDocRef(collectionPath: string, docId: string) {
  const fullCollectionPath = `/artifacts/${appId}/public/data/${collectionPath}`;
  return doc(db, fullCollectionPath, docId);
}

// Function to get a collection reference for public data
export function getPublicCollectionRef(collectionPath: string) {
  const fullCollectionPath = `/artifacts/${appId}/public/data/${collectionPath}`;
  return collection(db, fullCollectionPath);
}
