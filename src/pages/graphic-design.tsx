import React from 'react';
import SectionTitle from '../components/section-title';
import WorksGrid from '../components/works-grid';
import { useWorks } from '../hooks/use-works';

const GraphicDesignPage: React.FC = () => {
  const { works } = useWorks();
  
  return (
    <div>
      <SectionTitle 
        title="Графический дизайн" 
        subtitle="Логотипы, фирменный стиль, иллюстрации и другие графические работы"
      />
      
      <WorksGrid works={works} category="graphic-design" />
    </div>
  );
};

export default GraphicDesignPage;