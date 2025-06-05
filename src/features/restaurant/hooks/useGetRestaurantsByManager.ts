// src/app/features/restaurant/hooks/useGetRestaurantsByManager.ts

/**
 * Hook para obtener todos los restaurantes gestionados por un manager.
 *
 * @param managerId ID del manager
 */

import { useEffect, useState } from 'react';
import { getRestaurantsByManager } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';


export const useGetRestaurantsByManager = (managerId: string) => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurantsByManager(managerId);
      setRestaurants(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener restaurantes del manager');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (managerId) fetchRestaurants();
  }, [managerId]);

  return {
    restaurants,
    loading,
    error,
    refetch: fetchRestaurants,
  };
};
