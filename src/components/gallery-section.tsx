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

  // 1. Загружаем данные об изображениях
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

  // 2. Распределяем изображения по колонкам
  const [column1, column2, column3] = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []];
    allImages.forEach((image, index) => {
      cols[index % 3].push(image);
    });
    return cols;
  }, [allImages]);

  // 3. Эффект для надежного измерения высоты колонок ПОСЛЕ загрузки картинок
  useEffect(() => {
    if (loading || allImages.length === 0) return;

    const refs = [col1Ref, col2Ref, col3Ref];
    const imagesInDOM = refs.flatMap(ref => Array.from(ref.current?.querySelectorAll('img') || []));
    
    if (imagesInDOM.length === 0) return;

    let loadedImagesCount = 0;
    
    const checkAllImagesLoaded = () => {
      loadedImagesCount++;
      if (loadedImagesCount === imagesInDOM.length) {
        // Все картинки загружены, теперь можно измерять высоту!
        console.log("Все изображения в галерее загружены. Измеряем высоту колонок.");
        setColHeights({
          col1: col1Ref.current?.scrollHeight || 0,
          col2: col2Ref.current?.scrollHeight || 0,
          col3: col3Ref.current?.scrollHeight || 0,
        });
      }
    };

    imagesInDOM.forEach(img => {
      // Если картинка уже в кэше браузера, она загружена
      if (img.complete) {
        checkAllImagesLoaded();
      } else {
        // Если нет, вешаем обработчики
        img.addEventListener('load', checkAllImagesLoaded);
        img.addEventListener('error', checkAllImagesLoaded); // Считаем загруженной даже если ошибка
      }
    });

    // Очистка обработчиков при размонтировании компонента
    return () => {
      imagesInDOM.forEach(img => {
        img.removeEventListener('load', checkAllImagesLoaded);
        img.removeEventListener('error', checkAllImagesLoaded);
      });
    };
  }, [loading, allImages]); // Запускаем этот эффект, когда загрузка завершилась

  // 4. Анимация
  const scrollAnimationVariants = (height: number, reverse: boolean) => {
    if (height === 0) return {};
    const scrollDistance = height / 5; 

    return {
      animate: {
        y: reverse ? [0, scrollDistance] : [0, -scrollDistance], 
        transition: {
          y: {
            duration: 50, // Сделаем 90 секунд, как было у тебя
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
      <div className="container mx-auto px-4">
        <motion.h2 /* ... */ >
            {/* ... твой заголовок ... */}
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20"><Spinner size="lg" /></div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-20 text-foreground/70">{/* ... */}</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-h-[600px] overflow-hidden">
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col1Ref} variants={scrollAnimationVariants(colHeights.col1, false)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column1, 1)}
              </motion.div>
            </div>
            
            {/* Вторая колонка с обратным скроллом */}
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col2Ref} variants={scrollAnimationVariants(colHeights.col2, false)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column2, 2)}
              </motion.div>
            </div>
            
            <div className="overflow-hidden h-[600px] flex flex-col">
              <motion.div ref={col3Ref} variants={scrollAnimationVariants(colHeights.col3, false)} animate="animate" className="flex flex-col gap-4">
                {duplicatedContent(column3, 3)}
              </motion.div>
            </div>
          </div>
        )}

        <motion.div /* ... */ >
          {/* ... твоя кнопка ... */}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;