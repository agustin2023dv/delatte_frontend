// src/app/features/restaurant/hooks/useUpdateRestaurant.ts

import { useState } from 'react';
import { updateRestaurant } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para actualizar los datos de un restaurante.
 */
export const useUpdateRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (
    id: string,
    data: Partial<IRestaurant>
  ): Promise<IRestaurant> => {
    try {
      setLoading(true);
      setError(null);
      const updated = await updateRestaurant(id, data);
      return updated;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar restaurante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdate,
    loading,
    error,
  };
};
