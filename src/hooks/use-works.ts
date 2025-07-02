import React from 'react';
import { Work } from '../types/work';
import { getWorks } from '../services/work-service';

export const useWorks = () => {
  const [works, setWorks] = React.useState<Work[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getWorks();
        setWorks(data);
      } catch (err) {
        setError('Ошибка при загрузке работ');
        console.error('Error fetching works:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWorks();
  }, []);
  
  return { works, setWorks, isLoading, error };
};
