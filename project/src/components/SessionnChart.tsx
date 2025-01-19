import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useAuthStore } from "../store/authStore";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const SessionChart: React.FC = () => {
  const sessionHistory = useAuthStore((state) => state.sessionHistory);
  const user = useAuthStore((state) => state.user);
//   const addSessionEvent = useAuthStore((state) => state.addSessionEvent);

  const [currentDuration, setCurrentDuration] = useState<number>(0);

  // Start the interval for tracking the current session duration
  useEffect(() => {
    if (!user) return; // Don't start the timer if the user is not logged in

    const intervalId = setInterval(() => {
      setCurrentDuration((prevDuration) => prevDuration + 5); // Increment the current session duration by 5 seconds
    }, 5000); // Update every 5 seconds

    // Cleanup the interval when the user logs out or the component unmounts
    return () => clearInterval(intervalId);
  }, [user]); // Re-run effect when user login/logout status changes

  // Format seconds into hours and minutes (e.g., 2h 5min)
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  };

  // Memoize session durations, only recomputing when sessionHistory or currentDuration changes
  const durations = useMemo(() => {
    const sessions = [];
    let lastLogin: Date | null = null;

    // Process the session history and calculate session durations
    for (const entry of sessionHistory) {
      const entryTimestamp = new Date(entry.timestamp); // Convert to Date object

      if (entry.type === "login") {
        lastLogin = entryTimestamp;
      } else if (entry.type === "logout" && lastLogin) {
        const duration = (entryTimestamp.getTime() - lastLogin.getTime()) / 1000; // Duration in seconds
        sessions.push({
          session: `Session ${sessions.length + 1}`,
          duration,
        });
        lastLogin = null;
      }
    }

    // Add the current session duration if the user is still logged in
    if (user && lastLogin) {
      const currentSessionDuration = (new Date().getTime() - lastLogin.getTime()) / 1000;
      sessions.push({
        session: `Session ${sessions.length + 1}`,
        duration: currentSessionDuration + currentDuration, // Include the ongoing session duration
      });
    }

    return sessions;
  }, [sessionHistory, currentDuration, user]); // Only recompute if sessionHistory or currentDuration changes

  // Prepare chart data
  const data = {
    labels: durations.map((s) => s.session),
    datasets: [
      {
        label: "Duration",
        data: durations.map((s) => s.duration),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Session Durations</h2>
      {/* Display the formatted duration */}
      <div className="text-white mb-4">
        {user && formatDuration(currentDuration)}
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};
