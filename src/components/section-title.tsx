import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{title}</h2>
      {subtitle && (
        <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
    </motion.div>
  );
};

export default SectionTitle;