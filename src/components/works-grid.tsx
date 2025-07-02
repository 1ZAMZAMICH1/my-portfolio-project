import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, Tab } from '@heroui/react';
import { Work } from '../types/work';
import WorkCard from './work-card';

interface WorksGridProps {
  works: Work[];
  category?: string;
  showFilters?: boolean;
}

const WorksGrid: React.FC<WorksGridProps> = ({ works, category, showFilters = true }) => {
  const [filter, setFilter] = React.useState<string>('all');
  
  const filteredWorks = React.useMemo(() => {
    if (category) {
      return works.filter(work => work.category === category);
    }
    
    if (filter === 'all') {
      return works;
    }
    
    return works.filter(work => work.tags?.includes(filter));
  }, [works, filter, category]);
  
  // Получаем уникальные теги из всех работ
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    works.forEach(work => {
      work.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [works]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div>
      {showFilters && allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Tabs 
            aria-label="Фильтры работ" 
            color="primary"
            variant="light"
            selectedKey={filter}
            onSelectionChange={setFilter as any}
            className="justify-center"
          >
            <Tab key="all" title="Все работы" />
            {allTags.map(tag => (
              <Tab key={tag} title={tag} />
            ))}
          </Tabs>
        </motion.div>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredWorks.map(work => (
          <WorkCard key={work.id} work={work} />
        ))}
      </motion.div>
      
      {filteredWorks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70">Работы не найдены</p>
        </div>
      )}
    </div>
  );
};

export default WorksGrid;