import React from 'react';
import SectionTitle from '../components/section-title';
import WorksGrid from '../components/works-grid';
import { useWorks } from '../hooks/use-works';

const PresentationsPage: React.FC = () => {
  const { works } = useWorks();
  
  return (
    <div>
      <SectionTitle 
        title="Презентации" 
        subtitle="Эффективные и визуально привлекательные презентации для бизнеса и образования"
      />
      
      <WorksGrid works={works} category="presentations" />
    </div>
  );
};

export default PresentationsPage;