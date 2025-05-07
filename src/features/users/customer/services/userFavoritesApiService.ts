// src/app/features/customer/services/userFavoritesApiService.ts

import { IRestaurant, IUserFavorites } from "@delatte/shared/interfaces";
import { axiosInstance } from "src/lib/axios/axiosInstance";

/**
 * Obtiene la lista de restaurantes favoritos del usuario autenticado.
 */
export const getUserFavorites = async (): Promise<IUserFavorites> => {
  const response = await axiosInstance.get('/favorites/');
  return response.data;
};

/**
 * Agrega un restaurante a los favoritos del usuario autenticado.
 * @param restaurantId ID del restaurante a agregar
 */
export const addUserFavorite = async (restaurantId: string): Promise<IUserFavorites> => {
  const response = await axiosInstance.post('/favorites/', { restaurantId });
  return response.data;
};

/**
 * Elimina un restaurante de los favoritos del usuario autenticado.
 * @param restaurantId ID del restaurante a eliminar
 */
export const removeUserFavorite = async (restaurantId: string): Promise<IUserFavorites> => {
  const response = await axiosInstance.delete('/favorites/', {
    data: { restaurantId },
  });
  return response.data;
};


/**
 * Obtiene los detalles completos de los restaurantes favoritos del usuario autenticado.
 * @param restaurantIds Array de IDs de restaurantes favoritos
 * @returns Array de restaurantes
 */
export const getFavoriteRestaurantsDetails = async (restaurantIds: string[]): Promise<IRestaurant[]> => {
  const response = await axiosInstance.post('/favorites/restaurants', { restaurantIds });
  return response.data.restaurants;
};