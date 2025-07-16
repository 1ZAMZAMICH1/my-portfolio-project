import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import ImageLightbox from "./image-lightbox"; 
import { getOptimizedUrl } from "../utils/image-optimizer";

interface WorkDetailModalProps {
  work: Work | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ work, isOpen, onClose }) => {
  const [activeImage, setActiveImage] = React.useState<string>("");
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxInitialIndex, setLightboxInitialIndex] = React.useState(0);

  const allImages = React.useMemo(() => {
    if (!work) return [];
    return [work.imageUrl, ...(work.additionalImages || [])];
  }, [work]);

  React.useEffect(() => {
    if (isOpen && allImages.length > 1) {
      allImages.forEach(imgUrl => {
        if (!imgUrl.endsWith('.webm') && !imgUrl.endsWith('.mp4')) {
          const img = new Image();
          img.src = getOptimizedUrl(imgUrl, { width: 1200 });
        }
      });
    }
  }, [isOpen, allImages]);

  React.useEffect(() => {
    if (work) {
      setActiveImage(work.imageUrl);
      setCurrentIndex(0);
    }
  }, [work]);

  React.useEffect(() => {
    if (allImages.length > 0) {
      setActiveImage(allImages[currentIndex]);
    }
  }, [currentIndex, allImages]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  const openLightbox = () => {
    // Лайтбокс открываем только для картинок
    if (!activeImage.endsWith('.webm') && !activeImage.endsWith('.mp4')) {
      setIsLightboxOpen(true);
      setLightboxInitialIndex(currentIndex); 
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  if (!work) return null;
  
  // --- Функция для рендера медиа (картинка или видео) ---
  const renderMedia = (url: string, isThumbnail = false) => {
    const isVideo = url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mp4');
    
    if (isVideo) {
      return (
        <video
          key={url} // Ключ важен для React, чтобы он перерисовывал видео
          src={url}
          className="w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      );
    }
    
    return (
      <img 
        src={getOptimizedUrl(url, { width: isThumbnail ? 200 : 1200 })}
        alt={work.title}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onCloseFromModalContent) => (
            <>
              <ModalHeader className="border-b border-white/10">
                <h2 className="text-xl font-semibold">{work.title}</h2>
              </ModalHeader>
              <ModalBody className="p-0">
                <div className="relative">
                  {/* Теперь при клике открывается лайтбокс только для картинок */}
                  <div 
                    onClick={openLightbox} 
                    className={`block w-full bg-black ${!activeImage.endsWith('.webm') && !activeImage.endsWith('.mp4') ? 'cursor-zoom-in' : ''}`}
                  >
                    {/* Рендерим основное медиа */}
                    {renderMedia(activeImage)}
                  </div>
                  
                  {allImages.length > 1 && (
                    <>
                      <Button isIconOnly variant="light" onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10 rounded-full" aria-label="Предыдущее изображение">
                        <Icon icon="lucide:chevron-left" className="w-6 h-6" />
                      </Button>
                      <Button isIconOnly variant="light" onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10 rounded-full" aria-label="Следующее изображение">
                        <Icon icon="lucide:chevron-right" className="w-6 h-6" />
                      </Button>
                    </>
                  )}
                  
                  {allImages.length > 1 && (
                    <div className="flex flex-wrap gap-2 p-4 border-t border-white/10 overflow-x-auto justify-center">
                      {allImages.map((mediaUrl, index) => (
                        <div
                          key={index}
                          className={`w-20 h-20 rounded-md cursor-pointer transition-all duration-200 overflow-hidden ${activeImage === mediaUrl ? 'border-2 border-primary scale-105' : 'border border-transparent'}`}
                          onClick={() => setCurrentIndex(index)}
                        >
                          {/* Рендерим миниатюры */}
                          {renderMedia(mediaUrl, true)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-foreground/80 text-justify mb-4">{work.description || work.fullDescription}</p>
                  {/* ... остальная информация о работе ... */}
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-white/10">
                <Button color="default" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Лайтбокс будет работать только для картинок */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={allImages.filter(url => !url.endsWith('.webm') && !url.endsWith('.mp4')).map(img => getOptimizedUrl(img, { width: 1920 }))}
        initialIndex={lightboxInitialIndex}
      />
    </>
  );
};

export default WorkDetailModal;