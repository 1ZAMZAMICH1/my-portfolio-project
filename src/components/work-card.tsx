import React from "react";
import { Card, CardBody, CardFooter, Chip } from "@heroui/react"; 
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import { getOptimizedUrl } from '../utils/image-optimizer';

interface WorkCardProps {
  work: Work;
  onView: (work: Work) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // --- ДОБАВЛЕН ТОЛЬКО ЭТОТ КЛАСС ---
      className="will-change-transform" 
    >
      <Card 
        className="glass-effect border border-white/10 h-full cursor-pointer"
        onClick={() => onView(work)}
      >
        {/* ... остальная часть кода карточки ... */}
      </Card>
    </motion.div>
  );
};

export default WorkCard;