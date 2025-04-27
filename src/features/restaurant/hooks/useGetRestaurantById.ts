// src/app/features/restaurant/hooks/useGetRestaurantById.ts

import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para obtener un restaurante por su ID usando react-query.
 *
 * @param id ID del restaurante
 */
export const useGetRestaurantById = (id: string) => {
  return useQuery<IRestaurant>({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
    enabled: !!id, // solo ejecuta la query si hay id
    retry: 1, // intenta una vez más si falla
  });
};
