import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layouts
import MainLayout from "./layouts/main-layout";

// Pages
import HomePage from "./pages/home";
import WorksPage from "./pages/works";
import AdminLoginPage from "./pages/admin/login";
import AdminDashboardPage from "./pages/admin/dashboard";
import NotFoundPage from "./pages/not-found";

// Auth context
import { AuthProvider } from "./contexts/auth-context";

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="works/:category" element={<WorksPage />} />
          </Route>
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}