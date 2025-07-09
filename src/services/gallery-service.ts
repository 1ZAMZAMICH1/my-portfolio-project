import { GalleryImage } from "../types/gallery";
import { getCachedData, writeAndRefreshData } from './data-cache'; // Импортируем из нового файла

// Получение всех изображений
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const data = await getCachedData(); // Берем данные из кэша
  return data.gallery || [];
};

// Добавление нового изображения
export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const db = await getCachedData(); // Получаем текущее состояние базы из кэша
  const newImageWithId = { ...image, id: Date.now().toString() };

  // Создаем НОВЫЙ объект всей базы, добавляя туда нашу картинку
  const newDbState = {
    ...db, // Копируем все старое (включая работы)
    gallery: [...db.gallery, newImageWithId] // Заменяем массив галереи на новый
  };
  
  await writeAndRefreshData(newDbState); // Отправляем ВСЮ базу на перезапись и обновляем кэш
  return newImageWithId;
};

// Удаление изображения
export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  const db = await getCachedData();
  const newGallery = db.gallery.filter(img => img.id !== id);

  if (newGallery.length < db.gallery.length) {
      await writeAndRefreshData({ ...db, gallery: newGallery });
      return true;
  }
  return false;
};