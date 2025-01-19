import { motion } from "framer-motion";
import { useTaskStore } from "../store/taskStore";
import { useAuthStore } from "../store/authStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Footer from "./Footer";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24"];

function SessionChart() {
  const sessionHistory = useAuthStore((state) => state.sessionHistory);

  const durations = sessionHistory.reduce((result, entry, index, arr) => {
    if (entry.type === "login" && arr[index + 1]?.type === "logout") {
      const loginTime = new Date(entry.timestamp);
      const logoutTime = new Date(arr[index + 1].timestamp);
      const duration = (logoutTime - loginTime) / 1000; // Duration in seconds
      result.push({ session: `Session ${result.length + 1}`, duration });
    }
    return result;
  }, []);

  return (
    <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Session Durations</h3>
      <BarChart width={400} height={300} data={durations}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="session" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }} />
        <Legend />
        <Bar dataKey="duration" fill="#34D399" name="Duration (seconds)" />
      </BarChart>
    </div>
  );
}

export function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks);

  const categoryData = ["BAU", "Ad Hoc", "Project"].map((category) => ({
    name: category,
    value: tasks.filter((task) => task.category === category).length,
  }));

  const priorityData = ["low", "medium", "high"].map((priority) => ({
    name: priority,
    tasks: tasks.filter((task) => task.priority === priority).length,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Task Categories</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={categoryData}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }} />
          <Legend />
        </PieChart>
      </div>

      <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Task Priorities</h3>
        <BarChart width={400} height={300} data={priorityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }} />
          <Legend />
          <Bar dataKey="tasks" fill="#60A5FA" />
        </BarChart>
      </div>

      {/* Session Chart */}
      <SessionChart />
      <Footer/>
    </motion.div>
    
  );
}
