import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  Auth,
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';
import firebaseConfig from './config';

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const analytics: Analytics = getAnalytics(app);

const firebase = {
  app,
  auth,
  db,
  analytics,
  register: async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
  },
  login: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  logout: () => {
    return signOut(auth);
  },
  resetPassword: (email: string) => {
    return sendPasswordResetEmail(auth, email);
  },
};

export default firebase;