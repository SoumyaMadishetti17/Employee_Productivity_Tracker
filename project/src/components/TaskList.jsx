import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, AlertTriangle } from 'lucide-react';

export default function TaskList({ tasks }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="text-red-500" size={18} />;
      case 'medium':
        return <Clock className="text-yellow-500" size={18} />;
      case 'low':
        return <Check className="text-green-500" size={18} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-card p-4 border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-white">{task.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-opacity-20 bg-purple-500">
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      {getPriorityIcon(task.priority)}
                      <span className="text-xs capitalize">{task.priority}</span>
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No tasks yet. Add your first task!
          </div>
        )}
      </div>
    </motion.div>
  );
}