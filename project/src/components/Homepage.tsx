import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ListTodo, TrendingUp, FileText } from "lucide-react";
import { motion } from "framer-motion"; // Import motion
import Footer from "./Footer";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Welcome Section */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-semibold text-white mb-4">
          Welcome to the Employee Productivity Tracker
        </h1>
        <p className="text-lg text-gray-300">
          Empowering employees to log and track their daily tasks, boosting transparency, and helping employers drive productivity.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Employee Task Logging Section */}
          <motion.div
            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <ListTodo className="w-8 h-8 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Employee Task Logging</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Track and log your tasks including routine, ad hoc, or project-based tasks with detailed timestamps, priorities, and references.
            </p>
            <Button
              onClick={() => navigate("/activities")}
              variant="primary"
              className="text-white bg-green-500"
            >
              Start Logging Tasks
            </Button>
          </motion.div>

          {/* Employer Dashboard Section */}
          <motion.div
            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Employer Dashboard</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Employers can monitor team productivity through advanced graphs, task breakdowns, and performance trends to gain insights into employee performance.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="primary"
              className="text-white bg-blue-500"
            >
              View Dashboard
            </Button>
          </motion.div>

          {/* AI-Powered Productivity Insights Section */}
          <motion.div
            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 1, scale: 1 }}
            whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <FileText className="w-8 h-8 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">AI-Powered Insights</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Harness AI to analyze employee performance with efficiency scores, task impact, sentiment analysis, and performance predictions.
            </p>
            <Button
              onClick={() => navigate("/insights")}
              variant="primary"
              className="text-white bg-yellow-500"
            >
              Explore Insights
            </Button>
          </motion.div>
        </div>

        {/* Gamification Features Section */}
        <motion.section
          className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Gamification Features</h3>
          <p className="text-gray-300 mb-4">
            Encourage productivity with leaderboards, team challenges, and rewards for high-performing employees.
          </p>
          <Button
            onClick={() => navigate("/gaming")}
            variant="primary"
            className="text-white bg-red-500"
          >
            Check Challenges & Rewards
          </Button>
        </motion.section>

        {/* Role-Based Access & Notifications Section */}
        <motion.section
          className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Role-Based Access & Notifications</h3>
          <p className="text-gray-300 mb-4">
            Stay informed with productivity alerts, personalized recommendations, and deadline reminders to help keep you on track.
          </p>
          <Button
            onClick={() => navigate("/notifications")}
            variant="primary"
            className="text-white bg-purple-500"
          >
            Manage Notifications
          </Button>
        </motion.section>

        {/* Comprehensive Dashboard Views Section */}
        <motion.section
          className="mt-12 bg-white/5 p-6 rounded-xl border border-white/10"
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }} // Pop-in effect on hover
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Comprehensive Dashboard Views</h3>
          <p className="text-gray-300 mb-4">
            Visualize your productivity through graphs, tables, and customizable reports that provide clear insights into team and personal performance.
          </p>
          <Button
            onClick={() => navigate("/comprehensive-dashboard")}
            variant="primary"
            className="text-white bg-blue-500"
          >
            View Dashboard Analytics
          </Button>
        </motion.section>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
