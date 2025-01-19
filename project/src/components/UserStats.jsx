import { motion } from 'framer-motion';
import { Target, Clock, Zap } from 'lucide-react';

export default function UserStats({ stats }) {
  const statItems = [
    {
      icon: <Target className="text-purple-400" size={24} />,
      label: 'Tasks Completed',
      value: stats?.tasksCompleted || 0,
    },
    {
      icon: <Clock className="text-purple-400" size={24} />,
      label: 'Hours Tracked',
      value: stats?.hoursTracked || 0,
    },
    {
      icon: <Zap className="text-purple-400" size={24} />,
      label: 'Efficiency Score',
      value: `${stats?.efficiency || 100}%`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <h4 className="text-2xl font-bold text-white">{item.value}</h4>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}