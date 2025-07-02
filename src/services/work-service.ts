import { Work, WorkCategory } from "../types/work";

// Единый адрес нашего нового API на Netlify
const API_URL = '/api/';

/**
 * Внутренняя функция для получения ВСЕХ данных из нашей базы (Gist).
 * Мы будем вызывать ее, чтобы потом работать с данными локально.
 * Это экономит запросы.
 */
const getAllData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API Read Error: ${response.status}`);
    // Данные приходят в виде { works: [...], gallery: [...] }
    return await response.json();
  } catch (error) {
    console.error("Fatal: Could not fetch data from Gist API", error);
    // Возвращаем пустую структуру, чтобы сайт не сломался
    return { works: [], gallery: [] };
  }
};

/**
 * Внутренняя функция для ЗАПИСИ всех данных в нашу базу (Gist).
 */
const writeAllData = async (dbObject) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbObject) // Отправляем весь объект целиком
    });
    if (!response.ok) throw new Error(`API Write Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fatal: Could not write data to Gist API", error);
    throw error;
  }
};

// --- Получение всех работ ---
export const getWorks = async (): Promise<Work[]> => {
  const data = await getAllData();
  return data.works || [];
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
  const db = await getAllData(); // Читаем текущую базу
  const newWorkWithId = { ...work, id: Date.now().toString() };
  db.works.push(newWorkWithId); // Добавляем новую работу
  await writeAllData(db); // Перезаписываем всю базу
  return newWorkWithId;
};

// --- Обновление существующей работы ---
export const updateWork = async (id: string, workUpdate: Partial<Work>): Promise<Work | undefined> => {
  const db = await getAllData();
  const workIndex = db.works.findIndex(w => w.id === id);
  if (workIndex === -1) {
    console.error(`Work with id ${id} not found for update.`);
    return undefined;
  }
  // Обновляем объект, объединяя старые и новые поля
  db.works[workIndex] = { ...db.works[workIndex], ...workUpdate };
  await writeAllData(db);
  return db.works[workIndex];
};

// --- Удаление работы ---
export const deleteWork = async (id: string): Promise<boolean> => {
  const db = await getAllData();
  const initialLength = db.works.length;
  // Фильтруем массив, оставляя все, кроме работы с нужным id
  db.works = db.works.filter(w => w.id !== id);
  
  // Если длина изменилась, значит что-то удалили
  if (db.works.length < initialLength) {
    await writeAllData(db);
    return true;
  }
  return false;
};