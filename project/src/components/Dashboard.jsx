import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProductivityChart from './ProductivityChart';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Welcome back, {user.name}
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TaskForm />
            <ProductivityChart tasks={tasks} />
          </div>
          <div>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}