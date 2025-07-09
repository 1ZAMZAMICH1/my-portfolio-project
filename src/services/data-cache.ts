import { Work } from '../types/work';
import { GalleryImage } from '../types/gallery';

interface DbData {
  works: Work[];
  gallery: GalleryImage[];
}

// Наш кэш. Сначала он пустой.
let cachedData: DbData | null = null;
let fetchPromise: Promise<DbData> | null = null;

const API_URL = 'https://zamzamich.netlify.app/.netlify/functions/api';

/**
 * Эта функция будет сердцем нашей системы.
 * Она загружает данные ТОЛЬКО ЕСЛИ их еще нет в кэше.
 * Все последующие вызовы будут мгновенно возвращать данные из кэша.
 */
export const getCachedData = (): Promise<DbData> => {
  if (cachedData) {
    // Если данные уже есть, возвращаем их мгновенно
    return Promise.resolve(cachedData);
  }

  if (fetchPromise) {
    // Если загрузка уже идет, возвращаем обещание этой загрузки
    return fetchPromise;
  }
  
  // Если данных нет и загрузка не идет, начинаем ее
  fetchPromise = fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API Read Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      cachedData = data; // Сохраняем данные в кэш
      fetchPromise = null; // Сбрасываем обещание
      return cachedData;
    })
    .catch(error => {
      fetchPromise = null; // Сбрасываем обещание при ошибке
      console.error("Fatal: Could not fetch data for cache", error);
      // Возвращаем пустую структуру, чтобы сайт не сломался
      return { works: [], gallery: [] };
    });

  return fetchPromise;
};

/**
 * Эта функция обновляет данные на сервере и в нашем кэше.
 */
export const writeAndRefreshData = async (dbObject: DbData): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbObject)
    });
    if (!response.ok) throw new Error(`API Write Error: ${response.status}`);
    
    // После успешной записи, обновляем наш локальный кэш
    cachedData = dbObject;
  } catch (error) {
    console.error("Fatal: Could not write data to Gist API", error);
    // При ошибке сбрасываем кэш, чтобы при следующей попытке данные загрузились заново
    cachedData = null; 
    throw error;
  }
};