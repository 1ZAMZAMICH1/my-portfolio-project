import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import ImageLightbox from "./image-lightbox"; 

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
    const images = [work.imageUrl];
    if (work.additionalImages) {
      images.push(...work.additionalImages);
    }
    return images;
  }, [work]);

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
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onCloseFromModalContent) => (
            <>
              <ModalHeader className="border-b border-white/10">
                <h2 className="text-xl font-semibold">{work.title}</h2>
              </ModalHeader>
              <ModalBody className="p-0">
                <div className="relative">
                  <div onClick={openLightbox} className="block w-full h-auto cursor-zoom-in">
                    <img 
                      src={activeImage} 
                      alt={work.title}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                    />
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
                      {allImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${work.title} ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-200 ${activeImage === image ? 'border-2 border-primary scale-105' : 'border border-transparent'}`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Мы вернем и эту ошибку, лишь бы все заработало */}
                  <p className="text-foreground/80 text-justify mb-4">{work.fullDescription}</p>

                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {work.tags.map((tag) => (
                        <Chip key={tag} size="sm" variant="flat" color="primary">{tag}</Chip>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="text-primary" />
                      <div>
                        <p className="text-sm text-foreground/60">Дата</p>
                        <p>{new Date(work.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                    {work.client && (
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:briefcase" className="text-primary" />
                        <div>
                          <p className="text-sm text-foreground/60">Клиент</p>
                          <p>{work.client}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {work.link && (
                    <div className="mb-4">
                      <a href={work.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                        <Icon icon="lucide:external-link" />
                        Посмотреть проект
                      </a>
                    </div>
                  )}
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
        images={allImages}
        initialIndex={lightboxInitialIndex}
      />
    </>
  );
};

export default WorkDetailModal;