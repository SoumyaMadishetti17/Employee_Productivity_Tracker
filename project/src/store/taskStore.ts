import { create } from 'zustand';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task, TaskCategory } from '../types/task';
import { useAuthStore } from './authStore';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'userId'>) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  getTasksByCategory: (category: TaskCategory) => Task[];
  subscribeToUserTasks: () => () => void;
  fetchTasksOnce: () => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<void>; // Added updateTask method
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // Add a task to Firestore
  addTask: async (taskData) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Mark task as complete in Firestore
  completeTask: async (taskId) => {
    try {
      set({ loading: true, error: null });
      await updateDoc(doc(db, 'tasks', taskId), {
        completedAt: serverTimestamp(),
      });
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Filter tasks by category
  getTasksByCategory: (category) => {
    return get().tasks.filter((task) => task.category === category);
  },

  // Subscribe to real-time updates of user tasks from Firestore
  subscribeToUserTasks: () => {
    const user = useAuthStore.getState().user;
    if (!user) return () => {};

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : null,
        };
      }) as Task[];

      set({ tasks });
    });

    return unsubscribe;
  },

  // Fetch tasks once from Firestore
  fetchTasksOnce: async () => {
    set({ loading: true, error: null });
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('No user found');
      
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : null,
        };
      }) as Task[];

      set({ tasks, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Delete task from Firestore
  deleteTask: async (taskId) => {
    try {
      set({ loading: true, error: null });
      await deleteDoc(doc(db, 'tasks', taskId));
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Update a task in Firestore
  updateTask: async (taskId, updatedData) => {
    try {
      set({ loading: true, error: null });
      await updateDoc(doc(db, 'tasks', taskId), updatedData);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }
}));
