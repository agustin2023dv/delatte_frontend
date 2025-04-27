// src/app/features/restaurant/hooks/useCheckIsManager.ts

import { useQuery } from '@tanstack/react-query';
import { restaurantPermissionsApiService } from '../services/restaurantPermissionsApiService';

/**
 * Hook para verificar si el usuario actual es manager o co-manager
 * de un restaurante específico.
 *
 * @param restaurantId ID del restaurante a consultar
 */
export const useCheckIsManager = (restaurantId: string) => {
  return useQuery({
    queryKey: ['isManager', restaurantId],
    queryFn: () => restaurantPermissionsApiService.checkIsManager(restaurantId),
    enabled: !!restaurantId, // Solo ejecuta si hay restaurantId válido
    retry: 1, // Reintenta solo una vez en caso de error
  });
};
