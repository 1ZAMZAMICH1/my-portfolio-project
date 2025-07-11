import { GalleryImage } from "../types/gallery";
import { getCachedData, writeAndRefreshData } from './data-cache'; // Импортируем из нового файла

// --- Получение всех изображений ---
export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const data = await getCachedData();
  return data.gallery || [];
};

// --- Добавление нового изображения ---
export const addGalleryImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const db = await getCachedData();
  const newImageWithId = { ...image, id: Date.now().toString() };

  const newDbState = {
    ...db,
    gallery: [...(db.gallery || []), newImageWithId]
  };
  
  await writeAndRefreshData(newDbState);
  return newImageWithId;
};

// --- Удаление изображения ---
export const deleteGalleryImage = async (id: string): Promise<boolean> => {
  const db = await getCachedData();
  const newGallery = db.gallery.filter(img => img.id !== id);

  if (newGallery.length < db.gallery.length) {
      await writeAndRefreshData({ ...db, gallery: newGallery });
      return true;
  }
  return false;
};