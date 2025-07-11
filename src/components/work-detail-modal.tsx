import React, { useState, useEffect, useMemo } from "react";
// ... другие импорты ...
import { getWorkById } from "../services/work-service"; // <-- УБЕДИСЬ, ЧТО ИМПОРТ ПРАВИЛЬНЫЙ

interface WorkDetailModalProps {
  workId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ workId, isOpen, onClose }) => {
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(false);

  // ... остальная часть кода модалки ...

  useEffect(() => {
    if (isOpen && workId) {
      setLoading(true);
      setWork(null);
      // --- ИСПОЛЬЗУЕМ ПРАВИЛЬНУЮ ФУНКЦИЮ ---
      getWorkById(workId)
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

  // ... остальной JSX код модалки ...
};

export default WorkDetailModal;