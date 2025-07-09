import React from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getGalleryImages } from "../services/gallery-service"; 
import { GalleryImage } from "../types/gallery"; 

const GallerySection: React.FC = () => {
  const [allImages, setAllImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  // Рефы для каждой колонки
  const col1Ref = React.useRef<HTMLDivElement>(null);
  const col2Ref = React.useRef<HTMLDivElement>(null);
  const col3Ref = React.useRef<HTMLDivElement>(null);

  // Состояние для хранения вычисленных высот колонок
  const [colHeights, setColHeights] = React.useState({ col1: 0, col2: 0, col3: 0 });

  React.useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const images = await getGalleryImages();
        
        // --- ОТЛАДОЧНЫЙ ЛОГ: СМОТРИМ, ЧТО ПРИШЛО С БЭКЕНДА ---
        console.log("ПОЛУЧЕНО ДАННЫХ ДЛЯ ГАЛЕРЕИ:", images);
        // ---------------------------------------------------------

        setAllImages(images); 
      } catch (error) {
        console.error("Ошибка при загрузке изображений галереи на главной странице:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);

  // Эффект для измерения высоты контента после загрузки изображений и рендеринга
  React.useEffect(() => {
    if (allImages.length > 0 && col1Ref.current && col2Ref.current && col3Ref.current) {
      const timer = setTimeout(() => {
        const heights = {
          col1: col1Ref.current?.scrollHeight || 0,
          col2: col2Ref.current?.scrollHeight || 0,
          col3: col3Ref.current?.scrollHeight || 0,
        };
        setColHeights(heights);
        console.log("Вычисленные высоты колонок (для анимации):", heights);
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [allImages]); 

  // Вспомогательная функция для распределения изображений по колонкам
  const chunkImagesIntoColumns = (images: GalleryImage[]) => {
    const cols: GalleryImage[][] = [[], [], []];
    images.forEach((image, index) => {
      cols[index % 3].push(image);
    });
    return cols;
  };

  const [column1, column2, column3] = React.useMemo(() => chunkImagesIntoColumns(allImages), [allImages]);

  // Варианты анимации для каждой колонки
  const scrollAnimationVariants = (height: number, reverse: boolean) => {
    if (height === 0) return {};
    const scrollDistance = height / 5; 

    return {
      initial: { y: 0 },
      animate: {
        y: reverse ? [0, scrollDistance] : [0, -scrollDistance], 
        transition: {
          y: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      },
    };
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.2 }}
          className="text-4xl font-bold text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">МОЯ</span> <span className="text-white">ГАЛЕРЕЯ</span>
          </h2>
          <div className="h-1 w-24 bg-red-500 mt-4"></div>
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-20 text-foreground/70">
            <Icon icon="lucide:image" className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">Галерея пока пуста. Добавьте изображения через админ-панель!</p>
          </div>
        ) : (
          <div 
            className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 max-h-[600px] overflow-hidden"
          >
            {/* Первая колонка */}
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div 
                ref={col1Ref} 
                variants={scrollAnimationVariants(colHeights.col1, false)}
                animate="animate"
                className="flex flex-col gap-4"
              >
                {[...column1, ...column1, ...column1, ...column1, ...column1].map((image, idx) => ( 
                  <div 
                    key={`col1-${image.id}-${idx}`}
                    className="relative overflow-hidden group rounded-lg"
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.title} 
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Вторая колонка */}
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div 
                ref={col2Ref}
                variants={scrollAnimationVariants(colHeights.col2, false)}
                animate="animate"
                className="flex flex-col gap-4"
              >
                {[...column2, ...column2, ...column2, ...column2, ...column2].map((image, idx) => (
                  <div 
                    key={`col2-${image.id}-${idx}`} 
                    className="relative overflow-hidden group rounded-lg"
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.title} 
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Третья колонка */}
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div 
                ref={col3Ref}
                variants={scrollAnimationVariants(colHeights.col3, false)}
                animate="animate"
                className="flex flex-col gap-4"
              >
                {[...column3, ...column3, ...column3, ...column3, ...column3].map((image, idx) => (
                  <div 
                    key={`col3-${image.id}-${idx}`} 
                    className="relative overflow-hidden group rounded-lg"
                  >
                    <img 
                      src={image.imageUrl} 
                      alt={image.title} 
                      className="w-full h-auto block"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button 
            as={Link} 
            to="/gallery" 
            variant="flat" 
            color="primary"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            Смотреть все работы
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;