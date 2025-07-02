// src/components/work-card.tsx

import React from "react";
// Удалили Button из импорта, так как он больше не нужен
import { Card, CardBody, CardFooter, Chip } from "@heroui/react"; 
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";

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
        // Удаляем isPressable и onPress отсюда, так как Card может не поддерживать их напрямую.
        // Мы сделаем CardBody кликабельным.
      >
        <CardBody 
          className="p-0 overflow-hidden cursor-pointer" // Добавляем cursor-pointer для визуальной индикации
          onClick={() => onView(work)} // <-- Теперь onClick на CardBody гарантирует клик!
        >
          <div className="relative group">
            <img 
              src={work.imageUrl} 
              alt={work.title}
              // Исправлено: h-auto для сохранения пропорций, убрана фиксированная высота h-48
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
            {/* Оверлей при наведении - кнопка "Подробнее" удалена из этого div */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              {/* Этот div теперь пустой, кнопка "Подробнее" здесь удалена */}
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