import { GalleryImage } from "../types/gallery";

// Единый адрес нашего нового API на Netlify
const API_URL = '/api/';

/**
 * Внутренняя функция для получения ВСЕХ данных из нашей базы (Gist).
 */
const getAllData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`API Read Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fatal: Could not fetch data from Gist API", error);
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
      body: JSON.stringify(dbObject)
    });
    if (!response.ok) throw new Error(`API Write Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fatal: Could not write data to Gist API", error);
    throw error;
  }
};

// --- Получение всех изображений из галереи ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const data = await getAllData();
  return data.gallery || [];
};

// --- Добавление нового изображения в галерею ---
export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const db = await getAllData(); // Читаем текущую базу
  // Преобразуем title в description, как было у тебя
  const newImageData = { 
    imageUrl: image.imageUrl, 
    description: image.title 
  };
  const newImageWithId = { ...newImageData, id: Date.now().toString() };
  db.gallery.push(newImageWithId); // Добавляем новое изображение
  await writeAllData(db); // Перезаписываем всю базу
  // Возвращаем в формате, который ожидает фронтенд
  return { id: newImageWithId.id, imageUrl: newImageWithId.imageUrl, title: newImageWithId.description };
};

// --- Удаление изображения из галереи ---
export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  const db = await getAllData();
  const initialLength = db.gallery.length;
  db.gallery = db.gallery.filter(img => img.id !== id);

  if (db.gallery.length < initialLength) {
    await writeAllData(db);
    return true;
  }
  return false;
};