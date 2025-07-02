import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/hero-section";
import WorkCategories from "../components/work-categories";
import SocialLinks from "../components/social-links";
import AboutMeSection from "../components/about-me-section";
import GallerySection from "../components/gallery-section";

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutMeSection />
      <WorkCategories />
      <GallerySection />
      <SocialLinks />
    </motion.div>
  );
};

export default HomePage;