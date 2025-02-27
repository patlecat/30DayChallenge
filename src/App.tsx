import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ChallengesPage from "./components/challenges/ChallengesPage";
import FriendsPage from "./components/friends/FriendsPage";
import ProfilePage from "./components/profile/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import routes from "tempo-routes";
import { useAuth } from "./lib/auth";

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && <Navbar onLogout={logout} />}
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/challenges"
              element={
                isAuthenticated ? <ChallengesPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/friends"
              element={
                isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              }
            />

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </main>
      </div>
    </Suspense>
