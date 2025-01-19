import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const badges = {
  taskMaster: {
    name: 'Task Master',
    description: 'Completed 50 tasks',
    icon: '🏆',
    color: 'from-yellow-400 to-yellow-600',
  },
  speedDemon: {
    name: 'Speed Demon',
    description: 'Completed 10 tasks before deadline',
    icon: '⚡',
    color: 'from-blue-400 to-blue-600',
  },
  teamPlayer: {
    name: 'Team Player',
    description: 'Collaborated on 20 tasks',
    icon: '🤝',
    color: 'from-green-400 to-green-600',
  },
};

export default function UserBadges({ userBadges }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mt-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-purple-400" size={24} />
        <h3 className="text-xl font-semibold">Your Achievements</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(badges).map(([key, badge]) => {
          const isEarned = userBadges?.includes(key);
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              className={`glass-card p-4 border ${
                isEarned ? 'border-purple-500' : 'border-gray-700 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-medium text-white">{badge.name}</h4>
                  <p className="text-sm text-gray-400">{badge.description}</p>
                </div>
              </div>
              {isEarned && (
                <div className="mt-2 text-xs text-purple-400">
                  Badge earned! 🎉
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}