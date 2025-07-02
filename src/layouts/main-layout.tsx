// src/layouts/main-layout.tsx

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col pearlescent-gradient">
      <Header />
      <motion.main 
        className="flex-grow relative z-10" // <-- Изменено здесь
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        key={pathname}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;