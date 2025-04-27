// src/app/features/restaurant/services/restaurantPermissionsApiService.ts

import { axiosInstance } from 'src/lib/axios/axiosInstance';

/**
 * Service para interactuar con los permisos de gestión de restaurantes.
 */
export const restaurantPermissionsApiService = {
  /**
   * Verifica si el usuario actual es manager o co-manager del restaurante especificado.
   * 
   * @param restaurantId ID del restaurante a verificar
   * @returns booleano `isManager`
   */
  checkIsManager: async (restaurantId: string): Promise<boolean> => {
    const response = await axiosInstance.get(`/permissions/is-manager/${restaurantId}`);
    return response.data.isManager;
  },
};
