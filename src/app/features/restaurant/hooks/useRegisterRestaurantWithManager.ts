/**
 * 🧾 Hook `useRegisterRestaurantWithManager`
 *
 * Encapsula el flujo de registro conjunto de un restaurante y su manager.
 *
 * ✔️ Llama al endpoint `POST /restaurants` con los datos de restaurante y manager
 * ✔️ Maneja estado de carga (`loading`) y errores (`error`)
 * ✔️ Devuelve el restaurante registrado
 *
 * Este hook se usa en formularios donde un nuevo manager crea su restaurante.
 */

import { useState } from 'react';
import {
  IManagerRegistrationDTO,
  IRestaurantRegistrationDTO,
} from '@delatte/shared/dtos';
import { IRestaurant } from '@delatte/shared/interfaces';
import { registerRestaurantAndManager } from '../services/restaurantBaseApiService';

export const useRegisterRestaurantWithManager = () => {
  const [loading, setLoading] = useState(false); // ⏳ Estado de carga
  const [error, setError] = useState<string | null>(null); // ⚠️ Error textual

  /**
   * Ejecuta el registro de un restaurante junto con su manager.
   *
   * @param restaurant Datos del restaurante
   * @param manager Datos del nuevo manager
   * @returns Restaurante creado
   * @throws Error si falla el proceso
   */
  const handleRegister = async (
    restaurant: IRestaurantRegistrationDTO,
    manager: IManagerRegistrationDTO
  ): Promise<IRestaurant> => {
    setLoading(true);
    setError(null);

    try {
      const { restaurant: createdRestaurant } = await registerRestaurantAndManager(
        restaurant,
        manager
      );
      return createdRestaurant;
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error inesperado');
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
