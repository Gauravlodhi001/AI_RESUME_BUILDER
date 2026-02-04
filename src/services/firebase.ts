import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';

// The Firebase configuration and custom auth token are provided by the canvas environment.
declare global {
  var __firebase_config: string | undefined;
  var __initial_auth_token: string | undefined;
  var __app_id: string | undefined;
}

const firebaseConfig = typeof window !== 'undefined' && window.__firebase_config 
  ? JSON.parse(window.__firebase_config)
  : {
      apiKey: 'AIzaSyC5V7h8kL9mN0oP1qR2sT3uV4wX5yZ6aB7',
      authDomain: 'ai-resume-builder.firebaseapp.com',
      projectId: 'ai-resume-builder',
      storageBucket: 'ai-resume-builder.appspot.com',
      messagingSenderId: '123456789',
      appId: '1:123456789:web:abc123def456'
    };

export { firebaseConfig };

const initialAuthToken = typeof window !== 'undefined' && window.__initial_auth_token ? window.__initial_auth_token : null;
export const appId = typeof window !== 'undefined' && window.__app_id ? window.__app_id : 'default-app-id';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Function to handle the custom authentication token
export async function authenticateWithToken(): Promise<User> {
  try {
    if (initialAuthToken) {
      const userCredential = await signInWithCustomToken(auth, initialAuthToken);
      console.log('Signed in with custom token!', userCredential.user);
      return userCredential.user;
    } else {
      const userCredential = await signInAnonymously(auth);
      console.log('Signed in anonymously!', userCredential.user);
      return userCredential.user;
    }
  } catch (error: any) {
    console.error('Firebase authentication failed:', error);
    throw error;
  }
}

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
