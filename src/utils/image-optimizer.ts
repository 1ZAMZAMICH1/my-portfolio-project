export const getOptimizedUrl = (originalUrl: string): string => {
  if (!originalUrl || !originalUrl.includes('res.cloudinary.com')) {
    return originalUrl;
  }

  const uploadMarker = '/upload/';
  const uploadIndex = originalUrl.indexOf(uploadMarker);

  if (uploadIndex === -1) {
    return originalUrl;
  }
  
  const transformations = 'q_auto,f_auto/';
  
  const baseUrl = originalUrl.substring(0, uploadIndex + uploadMarker.length);
  const imagePath = originalUrl.substring(uploadIndex + uploadMarker.length);
  
  return baseUrl + transformations + imagePath;
};