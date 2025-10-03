import { createContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';

// Define the shape of the full firebase object that will be in the context
interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  analytics: Analytics;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<never>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface FirebaseContextValue {
  firebase: FirebaseServices;
  user: User | null;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export default FirebaseContext;