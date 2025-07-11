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
  const [selectedWork, setSelectedWork] = React.useState<Work | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const validCategories = ['design', 'websites', 'apps', 'presentations'];
  
  React.useEffect(() => {
    if (!category || !validCategories.includes(category)) return;
    
    const loadWorks = async () => {
      setLoading(true);
      try {
        const categoryWorks = await getWorksByCategory(category as any);
        // Сортируем по полю 'order'
        categoryWorks.sort((a, b) => (a.order || 0) - (b.order || 0));
        setWorks(categoryWorks);
      } catch (error) {
        console.error("Ошибка при загрузке работ:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadWorks();
  }, [category]);
  
  const handleViewWork = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  if (!category || !validCategories.includes(category)) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold mb-4">{getCategoryName(category as any)}</h1>
        <p className="text-xl text-foreground/70">
          Коллекция моих работ в категории {getCategoryName(category as any).toLowerCase()}
        </p>
      </motion.div>
      
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
      
      <WorkDetailModal 
        work={selectedWork} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default WorksPage;