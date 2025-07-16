/**
 * Добавляет параметры оптимизации Cloudinary в URL.
 */
export const getOptimizedUrl = (
  originalUrl: string,
  options: { 
    quality?: string; 
    format?: string; 
    width?: number;
    forceFormat?: 'gif'; // Новая опция для форсирования формата
  } = {}
): string => {
  if (!originalUrl || !originalUrl.includes('res.cloudinary.com')) {
    return originalUrl;
  }

  const { quality = 'q_auto', format = 'f_auto', width, forceFormat } = options;

  const uploadMarker = '/upload/';
  const uploadIndex = originalUrl.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return originalUrl;
  }

  // Если нужно форсировать гифку, параметр 'f_auto' нам не нужен.
  const finalFormat = forceFormat ? `f_${forceFormat}` : format;

  const params = [quality, finalFormat];
  if (width) {
    params.push(`w_${width}`);
  }
  const transformations = params.filter(Boolean).join(',') + '/';
  
  const baseUrl = originalUrl.substring(0, uploadIndex + uploadMarker.length);
  const imagePath = originalUrl.substring(uploadIndex + uploadMarker.length);
  
  const versionAndId = imagePath.split('/').slice(-2).join('/');
  
  // Убираем расширение из пути, чтобы Cloudinary сам подставил нужное
  const pathWithoutExt = versionAndId.substring(0, versionAndId.lastIndexOf('.'));
  
  return baseUrl + transformations + pathWithoutExt;
};