import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useAuthStore } from "./store/authStore";
import { AuthForm } from "./components/auth/AuthForm";
import { PrivateRoute } from "./components/layout/PrivateRoute";
import { Button } from "./components/ui/button";
import { Logo } from "./components/Logo";
import HomePage from "./components/Homepage";
import { ActivityPage } from "./components/ActivityPage";
import { Dashboard } from "./components/Dashboard";
import  AiInsightsPage  from "./components/AiInsightsPage";
import Profile from "./components/Profile";
import GamingPage from "./components/Gaming";
import QuizGame from "./components/QuizGame";
import Footer from "./components/Footer";

function MainApp() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate(); // Hook to navigate

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="backdrop-blur-lg bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />

          {/* Container for Profile Icon and Sign Out Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hover:bg-white/10"
              onClick={() => navigate('/profile')} // Navigate to profile page
            >
              Profile
            </Button>

            <Button
              onClick={signOut}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insights" element={<AiInsightsPage />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/gaming" element={<GamingPage />} /> 
          <Route path="/challenge/:challengeId/quizgame" element={<QuizGame />} /> 
          <Route path="/footer" element={<Footer />} /> 
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && window.location.pathname === "/auth") {
        window.location.href = "/";
      } else if (!user && window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
              <AuthForm />
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MainApp />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
