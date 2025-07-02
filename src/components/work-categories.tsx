import React from "react";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getWorksByCategory } from "../services/work-service";
import { WorkCategory } from "../types/work";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
};

const categories: Category[] = [
  {
    id: "design",
    title: "Графический дизайн",
    description: "Логотипы, брендинг, иллюстрации и другие графические работы",
    icon: "lucide:palette",
    count: 12,
  },
  {
    id: "websites",
    title: "Веб-сайты",
    description: "Адаптивные сайты, лендинги и веб-приложения",
    icon: "lucide:globe",
    count: 8,
  },
  {
    id: "apps",
    title: "Приложения",
    description: "Мобильные и десктопные приложения для различных платформ",
    icon: "lucide:smartphone",
    count: 5,
  },
  {
    id: "presentations",
    title: "Презентации",
    description: "Бизнес-презентации, питчи и маркетинговые материалы",
    icon: "lucide:presentation",
    count: 7,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WorkCategories: React.FC = () => {
  const [categoryWorks, setCategoryWorks] = React.useState<Record<string, any[]>>({});
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const loadCategoryWorks = async () => {
      setLoading(true);
      try {
        const works = {
          design: await getWorksByCategory("design" as WorkCategory).then(works => works.slice(0, 3)),
          websites: await getWorksByCategory("websites" as WorkCategory).then(works => works.slice(0, 3)),
          apps: await getWorksByCategory("apps" as WorkCategory).then(works => works.slice(0, 3)),
          presentations: await getWorksByCategory("presentations" as WorkCategory).then(works => works.slice(0, 3))
        };
        setCategoryWorks(works);
      } catch (error) {
        console.error("Ошибка при загрузке работ:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategoryWorks();
  }, []);
  
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-red-900/10 to-black/0" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">МОИ</span> <span className="text-white">РАБОТЫ</span>
            </h2>
            <div className="h-1 w-24 bg-red-500 mt-4"></div>
          </motion.div>
          
          <motion.p 
            className="text-xl text-white/70 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Исследуйте мои проекты по категориям. Каждая работа — это результат тщательного планирования и креативного подхода.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300">
                <CardBody className="p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-500/20 p-4 rounded-none">
                        <Icon icon={category.icon} className="w-10 h-10 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                    </div>
                    
                    <p className="text-white/70 text-lg">{category.description}</p>
                    
                    {/* Карусель работ */}
                    <div className="h-40 relative overflow-hidden my-2">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <Spinner color="primary" />
                        </div>
                      ) : categoryWorks[category.id]?.length > 0 ? (
                        <div className="flex gap-3 h-full">
                          {categoryWorks[category.id].map((work, index) => (
                            <div 
                              key={work.id} 
                              className="w-1/3 h-full relative group overflow-hidden"
                            >
                              <img 
                                src={work.imageUrl} 
                                alt={work.title} 
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white text-xs font-medium text-center px-2">{work.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full border border-white/10">
                          <p className="text-white/50">Нет работ</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/50 font-mono">
                        {category.count.toString().padStart(2, '0')} ПРОЕКТОВ
                      </span>
                      <Button 
                        as={Link}
                        to={`/works/${category.id}`}
                        variant="flat" 
                        color="primary"
                        size="sm"
                        className="bg-transparent border border-red-500 rounded-none px-4 hover:bg-red-500/20"
                        endContent={<Icon icon="lucide:arrow-right" />}
                      >
                        СМОТРЕТЬ ВСЕ
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkCategories;