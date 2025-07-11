// ... импорты ...

const WorkCard: React.FC<WorkCardProps> = ({ work, onView }) => {
  // --- Варианты анимации для ОДНОЙ карточки ---
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    // --- ИЗМЕНЕНИЕ ЗДЕСЬ: используем variants ---
    <motion.div
      variants={itemVariants}
      className="h-full" // Добавил h-full для корректной высоты
    >
      <Card 
        className="glass-effect border border-white/10 h-full cursor-pointer"
        onClick={() => onView(work)}
        isPressable // Добавляем эффект нажатия от HeroUI
      >
        {/* ... остальной код карточки без изменений ... */}
      </Card>
    </motion.div>
  );
};

export default WorkCard;