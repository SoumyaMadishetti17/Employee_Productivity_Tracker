import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Track user's online status
export const trackUserStatus = (userId: string) => {
  const userStatusRef = doc(db, 'userStatus', userId);

  const updateOnlineStatus = async (status: boolean) => {
    try {
      await setDoc(
        userStatusRef,
        {
          online: status,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateOnlineStatus(true);
    } else {
      updateOnlineStatus(false);
    }
  });

  // Track window/tab close
  window.addEventListener('beforeunload', () => {
    updateOnlineStatus(false);
  });
};
