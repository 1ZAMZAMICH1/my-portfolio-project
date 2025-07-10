// src/components/work-card.tsx

import React from "react";
import { Card, CardBody, CardFooter, Chip } from "@heroui/react"; 
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import { getOptimizedUrl } from '../utils/image-optimizer'; // <-- ШАГ 1: ИМПОРТИРУЕМ НАШУ ФУНКЦИЮ

interface WorkCardProps {
  work: Work;
  onView: (work: Work) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className="glass-effect border border-white/10 h-full"
      >
        <CardBody 
          className="p-0 overflow-hidden cursor-pointer"
          onClick={() => onView(work)}
        >
          <div className="relative group">
            <img 
              // --- ШАГ 2: ИСПОЛЬЗУЕМ ФУНКЦИЮ И ДОБАВЛЯЕМ АТРИБУТЫ ---
              src={getOptimizedUrl(work.imageUrl, { width: 800 })} // Просим картинку шириной 800px для превью
              alt={work.title}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy" // <-- Добавляем ленивую загрузку
              width="800" // <-- Помогаем браузеру, указывая реальные размеры (если известны)
              height="600" // <-- Это можно убрать, если пропорции разные
            />
            {/* ---------------------------------------------------- */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
            <p className="text-foreground/70 text-sm line-clamp-2 mb-3">
              {work.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {work.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} size="sm" variant="flat" color="primary" className="text-xs">
                  {tag}
                </Chip>
              ))}
              {work.tags.length > 3 && (
                <Chip size="sm" variant="flat" color="default" className="text-xs">
                  +{work.tags.length - 3}
                </Chip>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter className="border-t border-white/10 flex justify-between items-center">
          <div className="text-xs text-foreground/50 flex items-center gap-1">
            <Icon icon="lucide:calendar" className="w-3 h-3" />
            {new Date(work.date).toLocaleDateString('ru-RU')}
          </div>
          {work.client && (
            <div className="text-xs text-foreground/50 flex items-center gap-1">
              <Icon icon="lucide:briefcase" className="w-3 h-3" />
              {work.client}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WorkCard;