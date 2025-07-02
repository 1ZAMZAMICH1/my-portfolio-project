import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const AboutMeSection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-900/5 to-black/0" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Декоративная рамка */}
              <div className="absolute inset-0 border-2 border-red-500/30 translate-x-4 translate-y-4" />
              
              {/* Контейнер для фото */}
              <div className="relative z-10 w-full h-full overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1749224379/IMG_2526_upscayl_1x_realesrgan-x4fast_lkgh3a.png" 
                  alt="Фото дизайнера" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Декоративный элемент */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-500/20 backdrop-blur-md flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/90 font-bold text-4xl">5+</div>
                  <div className="text-white/70 text-sm">лет опыта</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">ОБО</span> <span className="text-gradient">МНЕ</span>
            </h2>
            <div className="h-1 w-24 bg-red-500 mb-8"></div>
            
            <p className="text-xl text-white/80 mb-6">
              Я креативный дизайнер с более чем 5-летним опытом работы в области графического дизайна, 
              веб-разработки и создания цифровых продуктов.
            </p>
            
            <p className="text-lg text-white/70 mb-8">
              Мой подход сочетает в себе эстетику и функциональность, 
              что позволяет создавать проекты, которые не только выглядят привлекательно, 
              но и эффективно решают бизнес-задачи клиентов.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-red-500/20 p-3">
                      <Icon icon="lucide:award" className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Навыки</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>Графический дизайн</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>UI/UX дизайн</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>Веб-разработка</span>
                    </li>
                  </ul>
                </CardBody>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-md border border-white/10">
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-red-500/20 p-3">
                      <Icon icon="lucide:briefcase" className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Опыт</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>Брендинг</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>Веб-дизайн</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon icon="lucide:check" className="text-red-500" />
                      <span>Мобильные приложения</span>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;