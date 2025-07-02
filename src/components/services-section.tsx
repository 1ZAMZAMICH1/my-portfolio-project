import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import SectionTitle from './section-title';

const services = [
  {
    icon: 'lucide:pen-tool',
    title: 'Графический дизайн',
    description: 'Создание уникальных визуальных решений для вашего бренда, включая логотипы, фирменный стиль и маркетинговые материалы.'
  },
  {
    icon: 'lucide:globe',
    title: 'Веб-разработка',
    description: 'Разработка современных, отзывчивых и функциональных веб-сайтов с использованием передовых технологий.'
  },
  {
    icon: 'lucide:smartphone',
    title: 'Мобильные приложения',
    description: 'Создание нативных и кроссплатформенных мобильных приложений для iOS и Android с интуитивным интерфейсом.'
  },
  {
    icon: 'lucide:presentation',
    title: 'Презентации',
    description: 'Разработка эффективных и визуально привлекательных презентаций для бизнеса, конференций и образовательных целей.'
  }
];

const ServicesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16">
      <SectionTitle 
        title="Мои услуги" 
        subtitle="Предлагаю широкий спектр услуг в области дизайна и разработки для реализации ваших идей"
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={itemVariants} className="h-full">
            <Card className="glass-effect glow h-full card-hover">
              <CardBody className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Icon icon={service.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesSection;