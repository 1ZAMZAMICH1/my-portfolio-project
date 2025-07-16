import React from "react";
import { Card, CardBody, Chip } from "@heroui/react"; 
import { motion } from "framer-motion";
import { Work } from "../types/work";
import { getOptimizedUrl } from '../utils/image-optimizer';

interface WorkCardProps {
  work: Work;
  onView: (work: Work) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onView }) => {
  // Проверяем, является ли URL видеофайлом (webm или mp4)
  const isVideo = work.imageUrl.toLowerCase().endsWith('.webm') || work.imageUrl.toLowerCase().endsWith('.mp4');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        isPressable
        onPress={() => onView(work)}
        className="glass-effect border border-white/10 h-full overflow-hidden"
      >
        <CardBody className="p-0">
          <div className="relative group aspect-[4/3]">
            {/* --- НАШЕ ГЛАВНОЕ ИЗМЕНЕНИЕ --- */}
            {isVideo ? (
              <video
                src={work.imageUrl} // Для видео оптимизация Cloudinary делается иначе, пока оставим прямой URL
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline // Важно для автопроигрывания на мобильных, особенно на iOS
              />
            ) : (
              <img 
                src={getOptimizedUrl(work.imageUrl, { width: 800 })}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )}
            {/* --- КОНЕЦ ИЗМЕНЕНИЯ --- */}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{work.title}</h3>
            <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
              {work.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {work.tags?.map((tag) => (
                <Chip key={tag} size="sm" variant="flat" color="primary">{tag}</Chip>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default WorkCard;