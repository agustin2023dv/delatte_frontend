// src/app/features/restaurant/hooks/useRegisterRestaurantAndManager.ts

import { useState } from 'react';
import {
  IRestaurantRegistrationInitialDTO,
  IManagerRegistrationDTO,
} from '@delatte/shared/dtos';
import { registerRestaurantAndManager } from '../services/restaurantBaseApiService';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para registrar un restaurante junto con su manager.
 */
export const useRegisterRestaurantAndManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (
    restaurant: IRestaurantRegistrationInitialDTO,
    manager: IManagerRegistrationDTO
  ): Promise<{ restaurant: IRestaurant; manager: any }> => {
    try {
      setLoading(true);
      setError(null);
      const result = await registerRestaurantAndManager(restaurant, manager);
      return result;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    error,
  };
};
