/**
 * Добавляет параметры оптимизации Cloudinary в URL.
 */
export const getOptimizedUrl = (
  originalUrl: string,
  options: { quality?: string; format?: string; width?: number } = {}
): string => {
  if (!originalUrl || !originalUrl.includes('res.cloudinary.com')) {
    return originalUrl;
  }

  const { quality = 'q_auto', format = 'f_auto', width } = options;

  const uploadMarker = '/upload/';
  const uploadIndex = originalUrl.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return originalUrl;
  }

  const params = [quality, format];
  if (width) {
    params.push(`w_${width}`);
  }
  const transformations = params.filter(Boolean).join(',') + '/';
  
  const baseUrl = originalUrl.substring(0, uploadIndex + uploadMarker.length);
  const imagePath = originalUrl.substring(uploadIndex + uploadMarker.length);
  
  // Простая проверка, чтобы не дублировать параметры
  const versionAndId = imagePath.split('/').slice(-2).join('/');
  
  return baseUrl + transformations + versionAndId;
};