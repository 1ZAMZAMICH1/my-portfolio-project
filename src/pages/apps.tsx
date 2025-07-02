import React from 'react';
import SectionTitle from '../components/section-title';
import WorksGrid from '../components/works-grid';
import { useWorks } from '../hooks/use-works';

const AppsPage: React.FC = () => {
  const { works } = useWorks();
  
  return (
    <div>
      <SectionTitle 
        title="Мобильные приложения" 
        subtitle="Нативные и кроссплатформенные мобильные приложения для iOS и Android"
      />
      
      <WorksGrid works={works} category="apps" />
    </div>
  );
};

export default AppsPage;