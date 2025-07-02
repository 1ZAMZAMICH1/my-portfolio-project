import React from 'react';
import SectionTitle from '../components/section-title';
import WorksGrid from '../components/works-grid';
import { useWorks } from '../hooks/use-works';

const WebsitesPage: React.FC = () => {
  const { works } = useWorks();
  
  return (
    <div>
      <SectionTitle 
        title="Веб-сайты" 
        subtitle="Современные, отзывчивые и функциональные веб-сайты для различных целей"
      />
      
      <WorksGrid works={works} category="websites" />
    </div>
  );
};

export default WebsitesPage;