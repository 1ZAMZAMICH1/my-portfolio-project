import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[80px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient block mb-2">ЭДГАР</span>
              <span className="text-white/90">ШТРОМАЕР</span>
            </h1>
            
            <p className="text-xl text-white/70 mb-10 max-w-xl">
              Создаю уникальные дизайны и разрабатываю современные цифровые решения, 
              которые помогают брендам выделяться и достигать своих целей.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                as={Link}
                to="/works/design"
                color="primary" 
                size="lg"
                className="font-medium px-8 py-6 text-lg rounded-none border-2 border-red-500 bg-transparent hover:bg-red-500/20 transition-all duration-300"
                endContent={<Icon icon="lucide:arrow-right" className="ml-2" />}
              >
                СМОТРЕТЬ РАБОТЫ
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] hidden lg:block max-w-md mx-auto"
          >
            <div className="absolute inset-0 border-2 border-red-500/30 translate-x-4 translate-y-4 rounded-3xl" />
            <img 
              src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1749224203/20250322_210433_nmyzcs.jpg" 
              alt="Портфолио" 
              className="w-full h-full object-cover z-10 relative rounded-3xl"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">2024</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;