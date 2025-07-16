import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { Work } from "../types/work";

// Определяем, какие пропсы принимает наш компонент
interface WorkDetailModalProps {
  work: Work | null; // Может быть работа, а может быть null
  isOpen: boolean;    // Открыто или закрыто
  onClose: () => void;  // Функция, которая вызывается при закрытии
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ work, isOpen, onClose }) => {
  // Если нам не передали работу (work === null), то мы вообще ничего не рисуем.
  // Это самая надежная защита.
  if (!work) {
    return null;
  }

  // Если работа есть, рисуем модалку
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
    >
      <ModalContent>
        {/* Это просто обертка, которую требует HeroUI */}
        {(onCloseCallback) => (
          <>
            <ModalHeader>
              {/* Просто показываем заголовок работы */}
              {work.title}
            </ModalHeader>
            <ModalBody>
              {/* Просто показываем картинку */}
              <img 
                src={work.imageUrl} 
                alt={work.title}
                className="w-full h-auto rounded-lg"
              />
              {/* Просто показываем описание */}
              <p className="mt-4 whitespace-pre-wrap">
                {work.description}
              </p>
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