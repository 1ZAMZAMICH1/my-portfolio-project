import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@heroui/react";
import { Work } from "../types/work";
// Нам понадобится сервис для загрузки одной работы
import { getWorkById } from "../services/work-service"; 

interface WorkDetailModalProps {
  workId: string | null; // <-- ПРИНИМАЕМ ID, А НЕ ОБЪЕКТ
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ workId, isOpen, onClose }) => {
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  // Этот useEffect будет срабатывать, когда модалка открывается (т.е. когда workId меняется с null на строку)
  useEffect(() => {
    // Если нет ID, ничего не делаем
    if (!workId) {
      return;
    }
    
    const fetchWork = async () => {
      setLoading(true);
      try {
        // Загружаем данные ОДНОЙ работы по ее ID
        const fetchedWork = await getWorkById(workId);
        if (fetchedWork) {
          setWork(fetchedWork);
        } else {
          console.error(`Работа с ID ${workId} не найдена.`);
          onClose(); // Закрываем модалку, если работа не найдена
        }
      } catch (error) {
        console.error("Ошибка загрузки детальной информации о работе:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [workId]); // Зависимость от workId

  // Если модалка не открыта, ничего не рендерим
  if (!isOpen) {
    return null;
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onCloseCallback) => (
          <>
            <ModalHeader>
              {loading ? "Загрузка..." : work?.title}
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <div className="flex justify-center items-center h-48">
                  <Spinner />
                </div>
              ) : work ? (
                <>
                  <img 
                    src={work.imageUrl} 
                    alt={work.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="mt-4 whitespace-pre-wrap">
                    {work.description}
                  </p>
                </>
              ) : (
                <p>Не удалось загрузить данные о работе.</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onPress={onCloseCallback}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WorkDetailModal;