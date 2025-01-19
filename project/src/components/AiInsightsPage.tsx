import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Smile } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Footer from "./Footer";

const AiInsightsPage: React.FC = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [sentimentData, setSentimentData] = useState(null);
  const [productivityData, setProductivityData] = useState([]);
  const [performanceSubset, setPerformanceSubset] = useState(0); // 0 for first subset (1-4), 1 for second subset (5-7)
  const [productivitySubset, setProductivitySubset] = useState(0); // Similar for productivity data

  const generateRandomEmployeeData = () => {
    return [
      { name: "Employee 1", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 2", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 3", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 4", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 5", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 6", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
      { name: "Employee 7", efficiency: Math.random() * 100, impact: Math.random() * 100, sentiment: Math.random() * 100 },
    ];
  };

  const generateRandomProductivityData = () => {
    return [
      { appName: "Outlook", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "Teams", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "Word", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "Excel", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "PowerPoint", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "OneNote", usageDuration: Math.floor(Math.random() * 300) },
      { appName: "Skype", usageDuration: Math.floor(Math.random() * 300) },
    ];
  };

  useEffect(() => {
    setPerformanceData(generateRandomEmployeeData());
    setProductivityData(generateRandomProductivityData());
    setSentimentData({ score: Math.random() * 100 });
  }, []);

  const handleSentimentChange = () => {
    setSentimentData({ score: Math.random() * 100 });
  };

  const handlePerformanceSlideLeft = () => {
    setPerformanceSubset(0);
  };

  const handlePerformanceSlideRight = () => {
    setPerformanceSubset(1);
  };

  const handleProductivitySlideLeft = () => {
    setProductivitySubset(0);
  };

  const handleProductivitySlideRight = () => {
    setProductivitySubset(1);
  };

  const performanceSubsetData = performanceSubset === 0 ? performanceData.slice(0, 4) : performanceData.slice(4, 7);
  const productivitySubsetData = productivitySubset === 0 ? productivityData.slice(0, 4) : productivityData.slice(4, 7);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="text-center py-8">
        <h1 className="text-4xl font-semibold text-white mb-4">AI-Powered Employee Insights</h1>
        <p className="text-lg text-gray-300">
          Harness AI to analyze employee performance with efficiency scores, task impact, sentiment analysis, and performance predictions.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Performance Metrics */}
          <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Employee Performance Metrics</h3>
            <BarChart width={600} height={300} data={performanceSubsetData} className="max-w-full">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }} />
              <Legend />
              <Bar dataKey="efficiency" fill="#60A5FA" name="Efficiency" />
              <Bar dataKey="impact" fill="#34D399" name="Impact" />
              <Bar dataKey="sentiment" fill="#FBBF24" name="Sentiment" />
            </BarChart>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="primary" className="text-white bg-yellow-500" onClick={handlePerformanceSlideLeft}>
                ←
              </Button>
              <Button variant="primary" className="text-white bg-yellow-500" onClick={handlePerformanceSlideRight}>
                →
              </Button>
            </div>
          </div>

          {/* Employee Productivity Insights */}
          <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Employee Productivity Insights</h3>
            <BarChart width={600} height={300} data={productivitySubsetData} className="max-w-full" barCategoryGap={15}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="appName" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }} />
              <Legend />
              <Bar dataKey="usageDuration" fill="#60A5FA" name="App Usage Duration" />
            </BarChart>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="primary" className="text-white bg-yellow-500" onClick={handleProductivitySlideLeft}>
                ←
              </Button>
              <Button variant="primary" className="text-white bg-yellow-500" onClick={handleProductivitySlideRight}>
                →
              </Button>
            </div>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Sentiment Analysis</h3>
          <div className="flex items-center space-x-4 mb-4">
            <Smile className="w-8 h-8 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Sentiment Scores</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Leverage AI-powered sentiment analysis to track employee engagement and mood based on task-related feedback.
          </p>
          {sentimentData ? (
            <div className="text-center">
              <p className="text-white">{`Sentiment Score: ${sentimentData.score.toFixed(2)}`}</p>
            </div>
          ) : (
            <div className="text-center">Loading sentiment data...</div>
          )}
          <div className="text-center mt-4">
            <Button variant="primary" className="text-white bg-yellow-500" onClick={handleSentimentChange}>
              View Sentiment Analysis
            </Button>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default AiInsightsPage;
