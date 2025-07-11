import { Work } from '../types/work';
import { GalleryImage } from '../types/gallery';

// Тип для всей нашей базы данных
interface DbData {
  works: Work[];
  gallery: GalleryImage[];
}

// Переменные для хранения кэша и обещания загрузки
let cachedData: DbData | null = null;
let fetchPromise: Promise<DbData> | null = null;

// Прямой URL нашей функции
const API_URL = '/api/'

/**
 * Главная функция для получения данных.
 * Загружает данные с сервера ТОЛЬКО ПРИ ПЕРВОМ вызове.
 * Все последующие вызовы мгновенно возвращают данные из кэша.
 */
export const getCachedData = (): Promise<DbData> => {
  if (cachedData) {
    return Promise.resolve(cachedData); // Данные уже в кэше, отдаем сразу
  }

  if (fetchPromise) {
    return fetchPromise; // Загрузка уже идет, возвращаем ее обещание
  }
  
  console.log("%cFETCHING DATA FROM SERVER...", "color: orange; font-weight: bold;");
  
  fetchPromise = fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error(`API Read Error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("%cDATA LOADED AND CACHED!", "color: green; font-weight: bold;");
      cachedData = data; // Сохраняем в кэш
      fetchPromise = null; 
      return cachedData;
    })
    .catch(error => {
      fetchPromise = null;
      console.error("FATAL: Could not fetch data for cache", error);
      return { works: [], gallery: [] }; // Возвращаем пустую структуру при ошибке
    });

  return fetchPromise;
};

/**
 * Функция для записи данных.
 * Отправляет данные на сервер и ОБНОВЛЯЕТ наш кэш.
 */
export const writeAndRefreshData = async (dbObject: DbData): Promise<void> => {
  // Обновляем локальный кэш немедленно для быстрого отклика интерфейса
  cachedData = dbObject; 

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbObject)
    });
    if (!response.ok) {
      // Если запись не удалась, откатываем кэш обратно
      cachedData = null; 
      throw new Error(`API Write Error: ${response.status}`);
    }
  } catch (error) {
    cachedData = null; // Сбрасываем кэш при ошибке
    console.error("FATAL: Could not write data to Gist API", error);
    throw error;
  }
};