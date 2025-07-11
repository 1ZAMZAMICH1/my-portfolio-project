import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";
import { getWorksByCategory } from "../services/work-service";
import { getCategoryName, Work } from "../types/work";
import WorkCard from "../components/work-card";
import WorkDetailModal from "../components/work-detail-modal";

const WorksPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [works, setWorks] = React.useState<Work[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Храним только ID, а не весь объект ---
  const [selectedWorkId, setSelectedWorkId] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const validCategories = ['design', 'websites', 'apps', 'presentations'];
  
  React.useEffect(() => {
    if (!category || !validCategories.includes(category)) return;
    
    const loadWorks = async () => {
      setLoading(true);
      try {
        const categoryWorks = await getWorksByCategory(category as any);
        setWorks(categoryWorks);
      } catch (error) {
        console.error("Ошибка при загрузке работ:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadWorks();
  }, [category]);
  
  // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Сохраняем ID работы ---
  const handleViewWork = (work: Work) => {
    setSelectedWorkId(work.id);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkId(null); // Сбрасываем ID
  };
  
  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      {/* ... твой заголовок ... */}
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} onView={handleViewWork} />
          ))}
        </div>
      )}
      
      {/* --- ИЗМЕНЕНИЕ ЗДЕСЬ: Передаем ID в модалку --- */}
      <WorkDetailModal 
        workId={selectedWorkId} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default WorksPage;