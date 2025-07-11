import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getGalleryImages } from "../services/gallery-service"; 
import { GalleryImage } from "../types/gallery"; 
import { getOptimizedUrl } from "../utils/image-optimizer";

// Компонент для одной колонки
const GalleryColumn: React.FC<{ images: GalleryImage[] }> = ({ images }) => (
  <div className="flex flex-col gap-4">
    {images.map((image) => (
      <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
        <img 
          src={getOptimizedUrl(image.imageUrl, { width: 600 })} 
          alt={image.title} 
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    ))}
  </div>
);

const GallerySection: React.FC = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryImages()
      .then(setAllImages)
      .catch(err => console.error("Ошибка загрузки галереи:", err))
      .finally(() => setLoading(false));
  }, []);

  const [column1, column2, column3] = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []];
    allImages.forEach((image, index) => {
      cols[index % 3].push(image);
    });
    return cols;
  }, [allImages]);

  // Обертка для анимированной колонки
  const AnimatedColumn: React.FC<{ images: GalleryImage[], animationClass: string }> = ({ images, animationClass }) => (
    <div className={`flex flex-col ${animationClass} will-change-transform`}>
      {/* Рендерим контент ДВАЖДЫ для бесшовного цикла */}
      <GalleryColumn images={images} />
      <GalleryColumn images={images} />
    </div>
  );

  return (
    <section id="gallery" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* ... твой заголовок ... */}
        
        {loading ? (
          <div className="flex justify-center items-center h-[600px]"><Spinner size="lg" /></div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-20 text-foreground/70">{/* ... */}</div>
        ) : (
          <div 
            className="grid grid-cols-3 gap-4 md:gap-8 h-[600px] overflow-hidden" 
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}
          >
            <AnimatedColumn images={column1} animationClass="animate-scroll" />
            <AnimatedColumn images={column2} animationClass="animate-scroll-reverse" />
            <AnimatedColumn images={column3} animationClass="animate-scroll" />
          </div>
        )}

        {/* ... твоя кнопка ... */}
      </div>
    </section>
  );
};

export default GallerySection;