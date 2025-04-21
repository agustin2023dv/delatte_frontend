// src/app/features/restaurant/hooks/useGetAllRestaurants.ts

import { useEffect, useState } from 'react';
import { getAllRestaurants } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para obtener todos los restaurantes de la plataforma.
 */
export const useGetAllRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener restaurantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return {
    restaurants,
    loading,
    error,
    refetch: fetchRestaurants,
  };
};
