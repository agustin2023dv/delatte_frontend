import { axiosInstance } from 'src/lib/axios/axiosInstance';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Búsqueda de restaurantes por nombre
 * @param query texto a buscar
 * @param limit máximo de resultados
 */
export const searchRestaurantsByName = async (
  query: string,
  limit = 10
): Promise<IRestaurant[]> => {
  const response = await axiosInstance.get('/search/restaurants/by-name', {
    params: { q: query, limit },
  });
  return response.data;
};
