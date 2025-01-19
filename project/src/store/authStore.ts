import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth, trackUserStatus } from '../lib/firebase'; // Correctly import from firebase.ts

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  sessionHistory: { type: "login" | "logout"; timestamp: string }[];
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  sessionHistory: [],

  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      set({ user, loading: false });
      trackUserStatus(user.uid); // Track user status on login
      window.location.href = "/"; // Redirect after sign-up
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      set({ user, loading: false });
      trackUserStatus(user.uid); // Track user status on login
      set((state) => ({
        sessionHistory: [
          ...state.sessionHistory,
          { type: "login", timestamp: new Date().toISOString() },
        ],
      }));
      window.location.href = "/"; // Redirect after sign-in
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, loading: false });
      set((state) => ({
        sessionHistory: [
          ...state.sessionHistory,
          { type: "logout", timestamp: new Date().toISOString() },
        ],
      }));
      window.location.href = "/auth"; // Redirect to auth page on logout
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setUser: (user) => set({ user, loading: false }),
}));
