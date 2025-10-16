import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/super-admin-portal-xyz123/login"
              element={<SuperAdminLogin />}
            />
            <Route
              path="/super-admin-portal-xyz123"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className:
                "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
