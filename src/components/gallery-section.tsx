import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getGalleryImages } from "../services/gallery-service"; 
import { GalleryImage } from "../types/gallery"; 
import { getOptimizedUrl } from "../utils/image-optimizer";

const GallerySection: React.FC = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const [colHeights, setColHeights] = useState({ col1: 0, col2: 0, col3: 0 });

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const images = await getGalleryImages();
        setAllImages(images); 
      } catch (error) {
        console.error("Ошибка при загрузке изображений галереи:", error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  // --- УЛУЧШЕННЫЙ ЭФФЕКТ ДЛЯ ИЗМЕРЕНИЯ ВЫСОТЫ ---
  useEffect(() => {
    // Если картинок нет или они еще грузятся, ничего не делаем
    if (loading || allImages.length === 0) return;

    const measureHeights = () => {
      // Убедимся, что DOM-элементы колонок существуют
      if (col1Ref.current && col2Ref.current && col3Ref.current) {
        const newHeights = {
          col1: col1Ref.current.scrollHeight,
          col2: col2Ref.current.scrollHeight,
          col3: col3Ref.current.scrollHeight,
        };
        
        // Обновляем состояние, только если высоты реально изменились,
        // чтобы избежать лишних перерисовок
        if (newHeights.col1 !== colHeights.col1 || newHeights.col2 !== colHeights.col2 || newHeights.col3 !== colHeights.col3) {
          console.log("Высоты колонок изменились, обновляем:", newHeights);
          setColHeights(newHeights);
        }
      }
    };

    // Запускаем первое измерение с небольшой задержкой после загрузки данных
    const initialTimeout = setTimeout(measureHeights, 100);

    // Добавляем слушатель на изменение размера окна, чтобы пересчитать высоту, если что-то поменялось
    window.addEventListener('resize', measureHeights);
    
    // Также можно добавить проверку загрузки изображений для надежности
    const imagesInDOM = Array.from(document.querySelectorAll('#gallery img'));
    let loadedCount = 0;
    const totalImages = imagesInDOM.length;

    const onImageLoad = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
            // Когда все картинки точно загрузились, делаем финальное измерение
            console.log("Все изображения в DOM загружены, финальное измерение.");
            measureHeights();
        }
    };

    imagesInDOM.forEach(img => {
        if (img.complete) {
            onImageLoad();
        } else {
            img.addEventListener('load', onImageLoad);
            img.addEventListener('error', onImageLoad); // Считаем ошибку как "загрузку"
        }
    });

    // Очистка при размонтировании компонента
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', measureHeights);
      imagesInDOM.forEach(img => {
        img.removeEventListener('load', onImageLoad);
        img.removeEventListener('error', onImageLoad);
      });
    };
  }, [loading, allImages, colHeights]); // Добавили colHeights в зависимости

  const [column1, column2, column3] = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []];
    allImages.forEach((image, index) => {
      cols[index % 3].push(image);
    });
    return cols;
  }, [allImages]);
  
  const scrollAnimationVariants = (height: number, reverse: boolean) => {
    // Важно: если высота 0, анимация не должна запускаться
    if (height === 0) return { animate: { y: 0 } };

    const scrollDistance = height / 5; // Дублируем контент 5 раз

    return {
      animate: {
        y: reverse ? [0, -scrollDistance] : [0, scrollDistance], // Поменял направление для разнообразия
        transition: {
          y: {
            duration: 40, // Сделаем чуть быстрее
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        },
      },
    };
  };

  const duplicatedContent = (column: GalleryImage[], colNum: number) =>
    [...column, ...column, ...column, ...column, ...column].map((image, idx) => (
      <div key={`col${colNum}-${image.id}-${idx}`} className="relative overflow-hidden group rounded-lg">
        <img 
          src={getOptimizedUrl(image.imageUrl, { width: 600 })} 
          alt={image.title} 
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    ));

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* ... остальная часть твоего JSX без изменений ... */}
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
          <div className="h-1 w-24 bg-red-500 mt-4 mx-auto"></div>
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20"><Spinner size="lg" /></div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-20 text-foreground/70">
            <Icon icon="lucide:image" className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">Галерея пока пуста.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-h-[600px] overflow-hidden">
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col1Ref} variants={scrollAnimationVariants(colHeights.col1, true)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column1, 1)}
              </motion.div>
            </div>
            
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col2Ref} variants={scrollAnimationVariants(colHeights.col2, true)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column2, 2)}
              </motion.div>
            </div>
            
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col3Ref} variants={scrollAnimationVariants(colHeights.col3, true)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column3, 3)}
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
            Смотреть всю галерею
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;