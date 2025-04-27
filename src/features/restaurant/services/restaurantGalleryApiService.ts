// src/app/features/restaurant/services/restaurantGalleryApiService.ts

import { axiosInstance } from "src/lib/axios/axiosInstance";

export const restaurantGalleryApiService = {
  /**
   * Obtener fotos de la galería de un restaurante
   */
  getGalleryPhotos: async (restaurantId: string): Promise<string[]> => {
    const response = await axiosInstance.get(`/restaurants/${restaurantId}/gallery`);
    return response.data.photos; // `{ success: true, photos: [...] }`
  },

  /**
   * Subir una nueva foto a la galería de un restaurante (subiendo archivo directamente)
   */
  addPhotoToGallery: async (restaurantId: string, image: File): Promise<string[]> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await axiosInstance.post(
      `/restaurants/${restaurantId}/gallery`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.gallery; // `{ success: true, gallery: [...] }`
  },

  /**
   * Eliminar una foto de la galería de un restaurante
   */
  removePhotoFromGallery: async (
    restaurantId: string,
    photoUrl: string
  ): Promise<string[]> => {
    const response = await axiosInstance.delete(`/restaurants/${restaurantId}/gallery`, {
      data: { photoUrl },
    });

    return response.data.gallery; // `{ success: true, gallery: [...] }`
  },

  /**
   * 🚀 NUEVO: Agregar una URL de foto ya subida a la galería
   */
  addPhotoUrlToGallery: async (restaurantId: string, photoUrl: string): Promise<string[]> => {
    const response = await axiosInstance.post(
      `/restaurants/${restaurantId}/gallery`,
      { photoUrl } // Enviamos directamente el objeto { photoUrl }
    );

    return response.data.gallery; // `{ success: true, gallery: [...] }`
  },
};
