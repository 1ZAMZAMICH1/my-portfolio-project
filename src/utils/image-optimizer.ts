/**
 * Добавляет параметры оптимизации Cloudinary в URL.
 */
export const getOptimizedUrl = (
  originalUrl: string,
  options: { 
    quality?: string; 
    format?: string; 
    width?: number;
    forceFormat?: 'gif'; // Опция для форсирования формата .gif
  } = {}
): string => {
  // Если URL не от Cloudinary, возвращаем его как есть
  if (!originalUrl || !originalUrl.includes('res.cloudinary.com')) {
    return originalUrl;
  }

  const { quality = 'q_auto', format = 'f_auto', width, forceFormat } = options;

  const uploadMarker = '/upload/';
  const uploadIndex = originalUrl.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return originalUrl; // Если структура URL не та, которую мы ожидаем
  }

  // Если нужно форсировать гифку, параметр 'f_auto' нам не нужен
  const finalFormat = forceFormat ? `f_${forceFormat}` : format;

  const params = [quality, finalFormat];
  if (width) {
    params.push(`w_${width}`);
  }
  const transformations = params.filter(Boolean).join(',') + '/';
  
  const baseUrl = originalUrl.substring(0, uploadIndex + uploadMarker.length);
  const imagePath = originalUrl.substring(uploadIndex + uploadMarker.length);
  
  // Убираем расширение из пути, чтобы Cloudinary сам подставил нужное
  const pathWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'));
  
  return baseUrl + transformations + pathWithoutExt;
};