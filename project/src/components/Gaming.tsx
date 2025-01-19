import React from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const GamingPage: React.FC = () => {
  const navigate = useNavigate();

  // Sample challenges (you can replace these with dynamic data from an API or state)
  const challenges = [
    {
      id: 1,
      title: "Team Productivity Challenge",
      description: "Complete tasks on time and increase team productivity to earn rewards.",
      reward: "1000 points",
      status: "Ongoing",
    },
    {
      id: 2,
      title: "Weekly Task Completion Challenge",
      description: "Complete all tasks in a week to earn extra rewards and recognition.",
      reward: "500 points",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Top Performer Leaderboard",
      description: "Compete with colleagues and earn the top spot to receive the grand prize.",
      reward: "Special Prize + Recognition",
      status: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-semibold text-white mb-4">Gamification Challenges</h1>
        <p className="text-lg text-gray-300">
          Join exciting challenges, compete with your colleagues, and earn rewards based on your performance.
        </p>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <h2 className="text-3xl font-semibold text-white mb-6">Ongoing Challenges</h2>
          {/* Challenges List */}
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-300 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Reward: {challenge.reward}</span>
                  <span
                    className={`${
                      challenge.status === "Ongoing" ? "text-green-400" : "text-yellow-400"
                    } font-semibold`}
                  >
                    {challenge.status}
                  </span>
                </div>
                <Button
                  onClick={() => navigate(`/challenge/${challenge.id}/quizgame`)} // Navigate to the specific challenge page
                  variant="primary"
                  className="text-white bg-red-500 mt-4"
                >
                  Participate
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-white mb-6">Leaderboard</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Top Performers</h3>
            <div className="text-gray-300">
              {/* Sample Leaderboard */}
              <ol className="space-y-4">
                <li className="flex justify-between">
                  <span>1. John Doe</span>
                  <span>1000 points</span>
                </li>
                <li className="flex justify-between">
                  <span>2. Jane Smith</span>
                  <span>950 points</span>
                </li>
                <li className="flex justify-between">
                  <span>3. Alex Johnson</span>
                  <span>900 points</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-white mb-6">Rewards</h2>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Available Rewards</h3>
            <div className="text-gray-300">
              {/* Sample Rewards */}
              <ul className="space-y-4">
                <li>1st Place: Exclusive Prize + Recognition</li>
                <li>2nd Place: 1000 Reward Points</li>
                <li>3rd Place: 500 Reward Points</li>
                <li>Top 10: Leaderboard Recognition</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default GamingPage;
