import { vi, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// --- Firebase v9 Mocks ---

// Mock 'firebase/app'
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})), // Returns a mock app object
}));

// Mock 'firebase/auth'
const mockAuth = {
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Immediately call the callback with null user to simulate initial state
    callback(null);
    // Return a mock unsubscribe function
    return () => {};
  }),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({
      user: {
          updateProfile: vi.fn(() => Promise.resolve())
      }
  })),
  signOut: vi.fn(() => Promise.resolve()),
  sendPasswordResetEmail: vi.fn(() => Promise.resolve()),
  updateProfile: vi.fn(() => Promise.resolve()),
};

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn(() => mockAuth),
    onAuthStateChanged: mockAuth.onAuthStateChanged,
    signInWithEmailAndPassword: mockAuth.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: mockAuth.createUserWithEmailAndPassword,
    signOut: mockAuth.signOut,
    sendPasswordResetEmail: mockAuth.sendPasswordResetEmail,
    updateProfile: mockAuth.updateProfile,
  };
});


// Mock 'firebase/firestore'
const mockDb = {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
    updateDoc: vi.fn(() => Promise.resolve()),
    deleteDoc: vi.fn(() => Promise.resolve()),
    addDoc: vi.fn(() => Promise.resolve()),
    onSnapshot: vi.fn((query, callback) => {
        callback({ docs: [] });
        return () => {};
    }),
    query: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    startAfter: vi.fn(),
};

vi.mock('firebase/firestore', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getFirestore: vi.fn(() => mockDb),
        collection: mockDb.collection,
        doc: mockDb.doc,
        getDoc: mockDb.getDoc,
        updateDoc: mockDb.updateDoc,
        deleteDoc: mockDb.deleteDoc,
        addDoc: mockDb.addDoc,
        onSnapshot: mockDb.onSnapshot,
        query: mockDb.query,
        orderBy: mockDb.orderBy,
        limit: mockDb.limit,
        startAfter: mockDb.startAfter,
    }
});

// Mock 'firebase/analytics'
vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(() => ({})), // Returns a mock analytics object
}));

// Mock the top-level firebase module re-export
vi.mock('../src/firebase', async () => {
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    const { getAnalytics } = await import('firebase/analytics');

    const app = initializeApp({});
    const auth = getAuth(app);
    const db = getFirestore(app);
    const analytics = getAnalytics(app);

    return {
        default: {
            app,
            auth,
            db,
            analytics,
            register: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            resetPassword: vi.fn(),
        },
        FirebaseContext: React.createContext(null),
    };
});