export type WorkCategory = 'design' | 'websites' | 'apps' | 'presentations';

export interface Work {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  imageUrl: string;
  additionalImages?: string[]; // Добавляем поддержку дополнительных изображений
  tags: string[];
  date: string;
  client?: string;
  link?: string;
}

// Функция для получения названия категории на русском языке
export const getCategoryName = (category: WorkCategory): string => {
  const categories: Record<WorkCategory, string> = {
    design: 'Графический дизайн',
    websites: 'Веб-сайты',
    apps: 'Приложения',
    presentations: 'Презентации'
  };
  
  return categories[category];
};