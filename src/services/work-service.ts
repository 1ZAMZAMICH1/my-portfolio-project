import { Work, WorkCategory } from "../types/work";
import { getCachedData, writeAndRefreshData } from './data-cache'; // Импортируем из нового файла

// --- Получение всех работ ---
// Сразу сортируем по полю 'order' для консистентности
export const getWorks = async (): Promise<Work[]> => {
  const data = await getCachedData();
  return (data.works || []).sort((a, b) => (a.order || 0) - (b.order || 0));
};

// --- Получение работ по категории ---
export const getWorksByCategory = async (category: WorkCategory): Promise<Work[]> => {
  const allWorks = await getWorks();
  return allWorks.filter(work => work.category === category);
};

// --- Получение работы по ID ---
export const getWorkById = async (id: string): Promise<Work | undefined> => {
  const allWorks = await getWorks();
  return allWorks.find(work => work.id === id);
};

// --- Добавление новой работы ---
export const addWork = async (work: Omit<Work, 'id'>): Promise<Work> => {
  const db = await getCachedData();
  const maxOrder = db.works.reduce((max, w) => Math.max(max, w.order || 0), -1);
  const newWorkWithId = { ...work, id: Date.now().toString(), order: maxOrder + 1 };
  
  const newDbState = {
    ...db,
    works: [...(db.works || []), newWorkWithId]
  };

  await writeAndRefreshData(newDbState);
  return newWorkWithId;
};

// --- Обновление существующей работы ---
export const updateWork = async (id: string, workUpdate: Partial<Work>): Promise<Work | undefined> => {
    const db = await getCachedData();
    const workIndex = db.works.findIndex(w => w.id === id);
    if (workIndex === -1) {
      console.error(`Работа с id ${id} для обновления не найдена.`);
      return undefined;
    }

    const updatedWork = { ...db.works[workIndex], ...workUpdate };
    const newWorks = [...db.works];
    newWorks[workIndex] = updatedWork;

    await writeAndRefreshData({ ...db, works: newWorks });
    return updatedWork;
};

// --- Удаление работы ---
export const deleteWork = async (id: string): Promise<boolean> => {
    const db = await getCachedData();
    const newWorks = db.works.filter(w => w.id !== id);

    if (newWorks.length < db.works.length) {
        await writeAndRefreshData({ ...db, works: newWorks });
        return true;
    }
    return false;
};