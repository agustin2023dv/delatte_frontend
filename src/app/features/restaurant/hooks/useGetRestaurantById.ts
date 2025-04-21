// src/app/features/restaurant/hooks/useGetRestaurantById.ts

import { useEffect, useState } from 'react';
import { getRestaurantById } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para obtener un restaurante por su ID.
 *
 * @param id ID del restaurante
 */
export const useGetRestaurantById = (id: string) => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurant = async () => {
    try {
      const data = await getRestaurantById(id);
      setRestaurant(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener el restaurante');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRestaurant();
  }, [id]);

  return {
    restaurant,
    loading,
    error,
    refetch: fetchRestaurant,
  };
};
