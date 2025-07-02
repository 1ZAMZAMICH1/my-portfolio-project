import { GalleryImage } from "../types/gallery";

const API_URL = 'https://zamzamich.netlify.app/.netlify/functions/api';

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
  const galleryItems = data.gallery || [];

  // ИСПРАВЛЕНИЕ: Читаем `title` или `description` для совместимости
  return galleryItems.map((item: any) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    title: item.title || item.description || '' // Берем title, если нет - description, если нет - пустую строку
  }));
};

// --- Добавление нового изображения в галерею ---
export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const db = await getAllData();
  
  // ИСПРАВЛЕНИЕ: Сохраняем поле как `title`, а не `description`
  const newImageData = { 
    imageUrl: image.imageUrl, 
    title: image.title 
  };
  const newImageWithId = { ...newImageData, id: Date.now().toString() };
  db.gallery.push(newImageWithId); 
  await writeAllData(db);
  return { id: newImageWithId.id, imageUrl: newImageWithId.imageUrl, title: newImageWithId.title };
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