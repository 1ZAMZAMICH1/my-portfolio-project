import { Work, WorkCategory } from "../types/work";
// Импортируем наш новый кэш
import { getCachedData, writeAndRefreshData } from './data-cache';

// --- ПОЛУЧЕНИЕ ВСЕХ РАБОТ ---
export const getWorks = async (): Promise<Work[]> => {
  // Просто берем данные из кэша
  const data = await getCachedData();
  // Сортируем по полю 'order' при каждом получении
  return (data.works || []).sort((a, b) => (a.order || 0) - (b.order || 0));
};

// --- ПОЛУЧЕНИЕ РАБОТ ПО КАТЕГОРИИ ---
export const getWorksByCategory = async (category: WorkCategory): Promise<Work[]> => {
  const allWorks = await getWorks(); // Берем уже отсортированные работы
  return allWorks.filter(work => work.category === category);
};

// --- ПОЛУЧЕНИЕ ОДНОЙ РАБОТЫ ПО ID (ИСПРАВЛЕННАЯ ВЕРСИЯ) ---
export const getWorkById = async (id: string): Promise<Work | undefined> => {
  // Мы не делаем новый запрос! Мы просто ищем в уже загруженном списке.
  const allWorks = await getWorks(); 
  return allWorks.find(work => work.id === id);
};

// --- ДОБАВЛЕНИЕ РАБОТЫ ---
export const addWork = async (work: Omit<Work, 'id'>): Promise<Work> => {
  const db = await getCachedData();
  const maxOrder = (db.works || []).reduce((max, w) => Math.max(max, w.order || 0), -1);
  const newWorkWithId = { ...work, id: Date.now().toString(), order: maxOrder + 1 };
  
  const newDbState = {
    ...db,
    works: [...(db.works || []), newWorkWithId]
  };
  await writeAndRefreshData(newDbState);
  return newWorkWithId;
};

// --- ОБНОВЛЕНИЕ РАБОТЫ ---
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

// --- УДАЛЕНИЕ РАБОТЫ ---
export const deleteWork = async (id: string): Promise<boolean> => {
    const db = await getCachedData();
    const newWorks = db.works.filter(w => w.id !== id);
    if (newWorks.length < db.works.length) {
        await writeAndRefreshData({ ...db, works: newWorks });
        return true;
    }
    return false;
};