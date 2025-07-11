import React from "react";
// ... другие импорты ...
import WorkCard from "../components/work-card";

const WorksPage: React.FC = () => {
  // ... твой код с useEffect, useState ...
  
  // --- Варианты анимации для контейнера ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Задержка между анимацией каждой карточки
      },
    },
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      {/* ... твой заголовок ... */}
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Обернули grid в motion.div ---
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {works.map((work) => (
            <WorkCard key={work.id} work={work} onView={handleViewWork} />
          ))}
        </motion.div>
      )}
      
      <WorkDetailModal 
        work={selectedWork} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default WorksPage;