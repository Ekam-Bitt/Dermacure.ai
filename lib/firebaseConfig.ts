// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAsRerwCCbxkRVB2Wt_uWoYPMxWQrthvfc',
  authDomain: 'dermacure-ai-27ae5.firebaseapp.com',
  projectId: 'dermacure-ai-27ae5',
  storageBucket: 'dermacure-ai-27ae5.firebasestorage.app',
  messagingSenderId: '433476874873',
  appId: '1:433476874873:web:d64e25df75b5d7b5659aa8',
  measurementId: 'G-5BZDZFGS3Z'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
