// src/components/image-lightbox.tsx

import React from "react";
import { Modal, ModalContent, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ImageLightboxProps {
  images: string[]; // Массив всех изображений для пролистывания
  initialIndex: number; // Начальный индекс выбранного изображения
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  // Обновляем currentIndex, если initialIndex меняется (например, если открывается новая работа)
  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  
  if (!isOpen || !currentImage) return null; // Не рендерим, если закрыт или нет изображения

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="5xl" // Устанавливаем большой размер для лайтбокса
      isDismissable={true} // Можно закрыть по клику вне модалки
      scrollBehavior="outside" // Контент модалки не будет скроллиться, если он слишком большой
      className="bg-transparent shadow-none" // Убираем фон и тень модалки для чистого лайтбокса
    >
      <ModalContent className="bg-transparent shadow-none w-auto max-w-full h-auto max-h-[90vh] flex justify-center items-center">
        {(onCloseFromModalContent) => ( // HeroUI ModalContent может передавать onClose
          <div className="relative flex justify-center items-center w-full h-full">
            <img 
              src={currentImage} 
              alt={`Изображение ${currentIndex + 1} из ${images.length}`} 
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" // Изображение будет масштабироваться
            />
            
            {/* Кнопка закрытия */}
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              onPress={onClose} // Вызываем onClose, переданный в ImageLightbox
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full"
              aria-label="Закрыть изображение"
            >
              <Icon icon="lucide:x" className="w-6 h-6" />
            </Button>

            {/* Кнопки навигации */}
            {images.length > 1 && (
              <>
                <Button
                  isIconOnly
                  variant="flat"
                  color="primary"
                  onPress={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  aria-label="Предыдущее изображение"
                >
                  <Icon icon="lucide:chevron-left" className="w-8 h-8" />
                </Button>
                <Button
                  isIconOnly
                  variant="flat"
                  color="primary"
                  onPress={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  aria-label="Следующее изображение"
                >
                  <Icon icon="lucide:chevron-right" className="w-8 h-8" />
                </Button>
              </>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageLightbox;