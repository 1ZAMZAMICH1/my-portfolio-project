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
  
  // --- НОВЫЙ БЛОК КОДА ДЛЯ ПРЕДЗАГРУЗКИ ---
  React.useEffect(() => {
    // Если модальное окно открыто и есть картинки
    if (isOpen && allImages.length > 1) {
      // Создаем в памяти новые объекты Image для каждой картинки
      // Это заставляет браузер скачать их в кэш
      allImages.forEach(imgUrl => {
        const img = new Image();
        img.src = getOptimizedUrl(imgUrl, { width: 1200 }); // Предзагружаем оптимизированную версию
      });
      console.log("Предзагрузка изображений для модального окна запущена...");
    }
  }, [isOpen, allImages]);
  // --- КОНЕЦ НОВОГО БЛОКА ---

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
    setIsLightboxOpen(true);
    setLightboxInitialIndex(currentIndex); 
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  if (!work) return null;
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onCloseFromModalContent) => (
            <>
              <ModalHeader className="border-b border-white/10">
                <h2 className="text-xl font-semibold">{work.title}</h2>
              </ModalHeader>
              <ModalBody className="p-0">
                <div className="relative">
                  <div 
                    onClick={openLightbox} 
                    className="block w-full h-auto cursor-zoom-in"
                  >
                    <img 
                      src={getOptimizedUrl(activeImage, { width: 1200 })}
                      alt={work.title}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                    />
                  </div>
                  
                  {allImages.length > 1 && ( /* ...кнопки... */ )}
                  
                  {allImages.length > 1 && ( /* ...миниатюры... */ )}
                </div>

                <div className="p-4">
                  {/* ИСПРАВЛЕНИЕ ЗДЕСЬ: Используем work.description */}
                  <p className="text-foreground/80 text-justify mb-4">{work.description}</p>

                  {/* ...остальная часть твоего кода без изменений... */}
                  {work.tags && work.tags.length > 0 && ( /* ... */ )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* ... */ }
                  </div>
                  {work.link && ( /* ... */ )}
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

      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => getOptimizedUrl(img, { width: 1920 }))}
        initialIndex={lightboxInitialIndex}
      />
    </>
  );
};

export default WorkDetailModal;