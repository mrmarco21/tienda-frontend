const isDevelopment = process.env.NODE_ENV === 'development';

// URL base para el servidor
export const API_BASE_URL = process.env.REACT_APP_API_URL || (isDevelopment ? 'http://localhost:5000' : 'https://tu-backend-url.vercel.app');
export const BASE_URL = process.env.REACT_APP_BASE_URL || (isDevelopment ? 'http://localhost:3000' : 'https://tu-frontend-url.vercel.app');

// URL base para las imágenes
export const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/`;

// Función helper para obtener la URL completa de una imagen
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `${API_BASE_URL}/uploads/${imagePath}`;
}; 