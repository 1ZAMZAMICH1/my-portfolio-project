import { Work } from "../types/work";

// Демонстрационные данные для работ
export const works: Work[] = [
  // Графический дизайн
  {
    id: "design-1",
    title: "Ребрендинг компании TechVision",
    description: "Полный ребрендинг технологической компании, включая логотип, цветовую схему и фирменный стиль.",
    category: "design",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=design1",
    tags: ["брендинг", "логотип", "фирменный стиль"],
    date: "2023-10-15",
    client: "TechVision Inc."
  },
  {
    id: "design-2",
    title: "Дизайн упаковки для Eco Products",
    description: "Экологичная упаковка для линейки органических продуктов питания.",
    category: "design",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=design2",
    tags: ["упаковка", "экодизайн", "иллюстрация"],
    date: "2023-08-22",
    client: "Eco Products"
  },
  {
    id: "design-3",
    title: "Серия постеров для музыкального фестиваля",
    description: "Коллекция постеров для ежегодного городского музыкального фестиваля.",
    category: "design",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=design3",
    tags: ["постеры", "типографика", "иллюстрация"],
    date: "2023-06-10"
  },
  
  // Веб-сайты
  {
    id: "website-1",
    title: "Корпоративный сайт для финансовой компании",
    description: "Современный адаптивный сайт с интерактивными элементами и интеграцией CRM.",
    category: "websites",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=website1",
    tags: ["веб-дизайн", "frontend", "React"],
    date: "2023-11-05",
    client: "Finance Pro Ltd.",
    link: "https://example.com/finance-pro"
  },
  {
    id: "website-2",
    title: "Интернет-магазин органической косметики",
    description: "Полнофункциональный e-commerce сайт с каталогом продукции и системой оплаты.",
    category: "websites",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=website2",
    tags: ["e-commerce", "UX/UI", "адаптивный дизайн"],
    date: "2023-09-18",
    client: "NaturalBeauty",
    link: "https://example.com/natural-beauty"
  },
  {
    id: "website-3",
    title: "Портал для образовательной платформы",
    description: "Онлайн-платформа для дистанционного обучения с личными кабинетами и интерактивными курсами.",
    category: "websites",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=website3",
    tags: ["образование", "SPA", "TypeScript"],
    date: "2023-07-30",
    client: "EduLearn",
    link: "https://example.com/edulearn"
  },
  
  // Приложения
  {
    id: "app-1",
    title: "Мобильное приложение для фитнеса",
    description: "Приложение для iOS и Android с трекером тренировок и персональными планами.",
    category: "apps",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=app1",
    tags: ["мобильное приложение", "React Native", "фитнес"],
    date: "2023-12-01",
    client: "FitLife",
    link: "https://example.com/fitlife-app"
  },
  {
    id: "app-2",
    title: "Приложение для управления финансами",
    description: "Персональный финансовый менеджер с аналитикой расходов и планированием бюджета.",
    category: "apps",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=app2",
    tags: ["финансы", "Flutter", "аналитика"],
    date: "2023-10-10",
    client: "MoneyWise",
    link: "https://example.com/moneywise-app"
  },
  
  // Презентации
  {
    id: "presentation-1",
    title: "Презентация для стартапа в сфере AI",
    description: "Питч-дек для привлечения инвестиций в стартап искусственного интеллекта.",
    category: "presentations",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=presentation1",
    tags: ["питч-дек", "стартап", "инвестиции"],
    date: "2023-11-20",
    client: "AI Innovations"
  },
  {
    id: "presentation-2",
    title: "Годовой отчет для корпорации",
    description: "Визуализация годовых результатов и достижений международной корпорации.",
    category: "presentations",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=presentation2",
    tags: ["годовой отчет", "инфографика", "корпоративный стиль"],
    date: "2023-02-15",
    client: "Global Corp"
  },
  {
    id: "presentation-3",
    title: "Маркетинговая презентация нового продукта",
    description: "Презентация для запуска инновационного продукта на рынок.",
    category: "presentations",
    imageUrl: "https://img.heroui.chat/image/ai?w=800&h=600&u=presentation3",
    tags: ["маркетинг", "запуск продукта", "брендинг"],
    date: "2023-08-05",
    client: "InnoTech"
  }
];

// Функция для получения работ по категории
export const getWorksByCategory = (category: string): Work[] => {
  return works.filter(work => work.category === category);
};

// Функция для получения работы по ID
export const getWorkById = (id: string): Work | undefined => {
  return works.find(work => work.id === id);
};
