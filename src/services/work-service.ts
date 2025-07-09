import { Work, WorkCategory } from "../types/work";
import { getCachedData, writeAndRefreshData } from './data-cache'; // Импортируем из нового файла

// Получение всех работ
export const getWorks = async (): Promise<Work[]> => {
  const data = await getCachedData(); // Берем данные из кэша (или загружаем, если кэша нет)
  return data.works || [];
};

// Получение работ по категории
export const getWorksByCategory = async (category: WorkCategory): Promise<Work[]> => {
  const allWorks = await getWorks();
  return allWorks.filter(work => work.category === category);
};

// Получение работы по ID
export const getWorkById = async (id: string): Promise<Work | undefined> => {
  const allWorks = await getWorks();
  return allWorks.find(work => work.id === id);
};

// Добавление новой работы
export const addWork = async (work: Omit<Work, 'id'>): Promise<Work> => {
  const db = await getCachedData(); // Получаем текущее состояние базы из кэша
  const newWorkWithId = { ...work, id: Date.now().toString() };
  
  // Создаем НОВЫЙ объект всей базы, добавляя туда нашу работу
  const newDbState = {
    ...db, // Копируем все старое (включая галерею)
    works: [...db.works, newWorkWithId] // Заменяем массив работ на новый, с добавленным элементом
  };

  await writeAndRefreshData(newDbState); // Отправляем ВСЮ базу на перезапись и обновляем кэш
  return newWorkWithId;
};

// Обновление
export const updateWork = async (id: string, workUpdate: Partial<Work>): Promise<Work | undefined> => {
    const db = await getCachedData();
    const workIndex = db.works.findIndex(w => w.id === id);
    if (workIndex === -1) return undefined;

    const updatedWork = { ...db.works[workIndex], ...workUpdate };
    const newWorks = [...db.works];
    newWorks[workIndex] = updatedWork;

    await writeAndRefreshData({ ...db, works: newWorks });
    return updatedWork;
};

// Удаление
export const deleteWork = async (id: string): Promise<boolean> => {
    const db = await getCachedData();
    const newWorks = db.works.filter(w => w.id !== id);

    if (newWorks.length < db.works.length) {
        await writeAndRefreshData({ ...db, works: newWorks });
        return true;
    }
    return false;
}