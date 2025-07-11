import { Work, WorkCategory } from "../types/work";
import { getCachedData, writeAndRefreshData } from './data-cache';

// --- ПОЛУЧЕНИЕ СПИСКА РАБОТ (ЛЕГКИЕ ДАННЫЕ) ---
// Эта функция использует кэш и отдает только нужные для превью поля.
export const getWorks = async (): Promise<Work[]> => {
  const data = await getCachedData();
  const lightweightWorks = (data.works || []).map(work => ({
    id: work.id,
    title: work.title,
    description: work.description,
    imageUrl: work.imageUrl,
    category: work.category,
    order: work.order,
    tags: work.tags,
    // Важно: мы не запрашиваем fullDescription и additionalImages
  }));
  return lightweightWorks.sort((a, b) => (a.order || 0) - (b.order || 0));
};

// --- ПОЛУЧЕНИЕ ПОЛНЫХ ДАННЫХ ОДНОЙ РАБОТЫ ПО ID ---
// Эта функция делает отдельный, точечный запрос и получает ВСЕ поля.
// Используется в модалке и форме редактирования.
export const getWorkById = async (id: string): Promise<Work | undefined> => {
  const API_URL = '/api/';
  try {
    console.log(`Запрашиваю ПОЛНЫЕ данные для работы с ID: ${id}`);
    const response = await fetch(`${API_URL}?id=${id}`);
    if (!response.ok) {
      throw new Error(`API Error on getWorkById: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Не удалось загрузить полные данные для работы ${id}:`, error);
    return undefined;
  }
};

export const getWorksByCategory = async (category: WorkCategory): Promise<Work[]> => {
  const allWorks = await getWorks();
  return allWorks.filter(work => work.category === category);
};

// --- Функции записи должны сбрасывать кэш ---
export const addWork = async (work: Omit<Work, 'id'>): Promise<Work> => {
  const db = await getCachedData();
  const maxOrder = (db.works || []).reduce((max, w) => Math.max(max, w.order || 0), -1);
  const newWorkWithId = { ...work, id: Date.now().toString(), order: maxOrder + 1 };
  const newDbState = { ...db, works: [...(db.works || []), newWorkWithId] };
  await writeAndRefreshData(newDbState);
  return newWorkWithId;
};

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

export const deleteWork = async (id: string): Promise<boolean> => {
    const db = await getCachedData();
    const newWorks = db.works.filter(w => w.id !== id);
    if (newWorks.length < db.works.length) {
        await writeAndRefreshData({ ...db, works: newWorks });
        return true;
    }
    return false;
};