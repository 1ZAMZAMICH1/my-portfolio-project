import React, { useState, useEffect, useMemo } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Work } from "../types/work";
import { getWorkById } from "../services/work-service";
import { getOptimizedUrl } from "../utils/image-optimizer";
import ImageLightbox from "./image-lightbox";

interface WorkDetailModalProps {
  workId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ workId, isOpen, onClose }) => {
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  // Состояния для галереи внутри модалки
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Загружаем данные о работе, когда модалка открывается
  useEffect(() => {
    if (isOpen && workId) {
      setLoading(true);
      const fetchWork = async () => {
        try {
          const fetchedWork = await getWorkById(workId);
          setWork(fetchedWork || null);
        } catch (error) {
          console.error("Ошибка при загрузке детальной информации:", error);
          setWork(null);
        } finally {
          setLoading(false);
        }
      };
      fetchWork();
    } else {
      // Сбрасываем состояние при закрытии
      setWork(null);
      setCurrentIndex(0);
    }
  }, [isOpen, workId]);

  // Собираем все картинки в один массив
  const allImages = useMemo(() => {
    if (!work) return [];
    return [work.imageUrl, ...(work.additionalImages || [])];
  }, [work]);
  
  const activeImage = allImages[currentIndex] || "";

  // Функции для переключения
  const handleNextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const handlePrevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <Modal isOpen={true} onClose={onClose} size="2xl" scrollBehavior="inside">
        <ModalContent>
          {(onCloseCallback) => (
            <>
              <ModalHeader className="border-b border-white/10">
                <h2 className="text-xl font-semibold">{loading ? "Загрузка..." : work?.title}</h2>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center items-center h-64"><Spinner /></div>
                ) : work ? (
                  <>
                    <div className="relative mb-4">
                      <div onClick={openLightbox} className="cursor-zoom-in">
                        <img src={getOptimizedUrl(activeImage, { width: 1200 })} alt={work.title} className="w-full h-auto object-contain rounded-lg"/>
                      </div>
                      {allImages.length > 1 && (
                        <>
                          <Button isIconOnly variant="flat" onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10 rounded-full"><Icon icon="lucide:chevron-left" /></Button>
                          <Button isIconOnly variant="flat" onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10 rounded-full"><Icon icon="lucide:chevron-right" /></Button>
                        </>
                      )}
                    </div>

                    {allImages.length > 1 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {allImages.map((img, index) => (
                          <div key={index} className={`w-20 h-20 rounded-md cursor-pointer overflow-hidden ${index === currentIndex ? 'border-2 border-primary' : ''}`} onClick={() => setCurrentIndex(index)}>
                            <img src={getOptimizedUrl(img, { width: 200 })} alt={`thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-foreground/80 text-justify mb-4 whitespace-pre-wrap">{work.description || work.fullDescription}</p>

                    {work.tags && work.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {work.tags.map((tag) => ( <Chip key={tag} size="sm" variant="flat" color="primary">{tag}</Chip> ))}
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
                          <Icon icon="lucide:external-link" /> Посмотреть проект
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Не удалось загрузить данные о работе.</p>
                )}
              </ModalBody>
              <ModalFooter className="border-t border-white/10">
                <Button color="default" variant="light" onPress={onClose}>Закрыть</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        images={allImages.map(img => getOptimizedUrl(img, { width: 1920 }))}
        initialIndex={currentIndex}
      />
    </>
  );
};

export default WorkDetailModal;