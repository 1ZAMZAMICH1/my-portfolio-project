import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getGalleryImages } from "../services/gallery-service"; 
import { GalleryImage } from "../types/gallery"; 
import { getOptimizedUrl } from "../utils/image-optimizer";

// Компонент для одной колонки, чтобы не дублировать JSX
const GalleryColumn: React.FC<{ images: GalleryImage[], animationClass: string, colNum: number }> = ({ images, animationClass, colNum }) => (
  <div className="flex flex-col gap-4 py-2">
    {images.map((image, idx) => (
      <div key={`col${colNum}-${image.id}-${idx}`} className="rounded-lg overflow-hidden shadow-lg">
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

  const [column1, column2, column3] = useMemo(() => {
    const cols: GalleryImage[][] = [[], [], []];
    allImages.forEach((image, index) => {
      cols[index % 3].push(image);
    });
    return cols;
  }, [allImages]);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* ... твой заголовок ... */}
        
        {loading ? (
          <div className="flex justify-center items-center py-20"><Spinner size="lg" /></div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-20 text-foreground/70">{/* ... */}</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:gap-8 h-[600px] overflow-hidden">
            {/* Первая колонка */}
            <div className="animate-scroll will-change-transform">
              <GalleryColumn images={column1} animationClass="" colNum={1} />
              <GalleryColumn images={column1} animationClass="" colNum={1} />
            </div>
            
            {/* Вторая колонка */}
            <div className="animate-scroll-reverse will-change-transform">
              <GalleryColumn images={column2} animationClass="" colNum={2} />
              <GalleryColumn images={column2} animationClass="" colNum={2} />
            </div>
            
            {/* Третья колонка */}
            <div className="animate-scroll will-change-transform">
              <GalleryColumn images={column3} animationClass="" colNum={3} />
              <GalleryColumn images={column3} animationClass="" colNum={3} />
            </div>
          </div>
        )}

        {/* ... твоя кнопка ... */}
      </div>
    </section>
  );
};

export default GallerySection;