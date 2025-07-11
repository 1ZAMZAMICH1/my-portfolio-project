import React, { useState, useEffect, useMemo } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import ImageLightbox from "./image-lightbox"; 
import { getOptimizedUrl } from "../utils/image-optimizer";
import { getFullWorkById } from "../services/work-service"; // Импортируем новую функцию

interface WorkDetailModalProps {
  workId: string | null; // Получаем только ID
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ workId, isOpen, onClose }) => {
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(false);

  const [activeImage, setActiveImage] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  useEffect(() => {
    if (isOpen && workId) {
      setLoading(true);
      setWork(null);
      getFullWorkById(workId)
        .then(data => {
          if (data) {
            setWork(data);
            setActiveImage(data.imageUrl);
            setCurrentIndex(0);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, workId]);

  const allImages = useMemo(() => {
    if (!work) return [];
    return [work.imageUrl, ...(work.additionalImages || [])];
  }, [work]);

  useEffect(() => {
    if (allImages.length > 0) {
      setActiveImage(allImages[currentIndex]);
    }
  }, [currentIndex, allImages]);

  const handleNextImage = () => setCurrentIndex(p => (p + 1) % allImages.length);
  const handlePrevImage = () => setCurrentIndex(p => (p - 1 + allImages.length) % allImages.length);
  const openLightbox = () => { setIsLightboxOpen(true); setLightboxInitialIndex(currentIndex); };
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {() => (
            <>
              {loading && <div className="flex justify-center items-center h-96"><Spinner size="lg" /></div>}
              {!loading && !work && (
                  <ModalBody><p className="text-center p-8">Не удалось загрузить данные о работе.</p></ModalBody>
              )}
              {!loading && work && (
                <>
                  <ModalHeader className="border-b border-white/10">
                    <h2 className="text-xl font-semibold">{work.title}</h2>
                  </ModalHeader>
                  <ModalBody className="p-0">
                    <div className="relative">
                      <div onClick={openLightbox} className="block w-full h-auto cursor-zoom-in">
                        <img 
                          src={getOptimizedUrl(activeImage, { width: 1200 })}
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
                            <img key={index} src={getOptimizedUrl(image, { width: 200 })} alt={`${work.title} ${index + 1}`} className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-200 ${activeImage === image ? 'border-2 border-primary scale-105' : 'border border-transparent'}`} onClick={() => setCurrentIndex(index)} loading="lazy"/>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-foreground/80 text-justify mb-4 whitespace-pre-wrap">{work.description || work.fullDescription}</p>
                      {work.tags && work.tags.length > 0 && (<div className="flex flex-wrap gap-2 mb-4">{work.tags.map((tag) => (<Chip key={tag} size="sm" variant="flat" color="primary">{tag}</Chip>))}</div>)}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2"><Icon icon="lucide:calendar" className="text-primary" /><div><p className="text-sm text-foreground/60">Дата</p><p>{new Date(work.date).toLocaleDateString('ru-RU')}</p></div></div>
                        {work.client && (<div className="flex items-center gap-2"><Icon icon="lucide:briefcase" className="text-primary" /><div><p className="text-sm text-foreground/60">Клиент</p><p>{work.client}</p></div></div>)}
                      </div>
                      {work.link && (<div className="mb-4"><a href={work.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline"><Icon icon="lucide:external-link" />Посмотреть проект</a></div>)}
                    </div>
                  </ModalBody>
                  <ModalFooter className="border-t border-white/10">
                    <Button color="default" variant="light" onPress={onClose}>Закрыть</Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      {work && <ImageLightbox isOpen={isLightboxOpen} onClose={closeLightbox} images={allImages.map(img => getOptimizedUrl(img, { width: 1920 }))} initialIndex={lightboxInitialIndex} />}
    </>
  );
};

export default WorkDetailModal;