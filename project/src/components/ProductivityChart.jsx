import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function ProductivityChart({ tasks }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processData = () => {
      const categoryCounts = tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        tasks: count,
      }));
    };

    setChartData(processData());
  }, [tasks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-xl font-semibold mb-4">Task Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
              }}
            />
            <Bar dataKey="tasks" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}