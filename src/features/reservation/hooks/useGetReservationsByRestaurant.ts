// src/app/features/reservations/hooks/useGetReservationsByRestaurant.ts

import { useQuery } from '@tanstack/react-query';
import { getReservationsByRestaurant } from '../services/reservationBaseApiService';
import { IReservationResponseDTO } from '@delatte/shared/dtos';

/**
 * Hook para obtener las reservas de un restaurante (como manager o superadmin).
 */
export const useGetReservationsByRestaurant = (restaurantId: string) => {
  return useQuery<IReservationResponseDTO[], Error>({
    queryKey: ['reservations', restaurantId],
    queryFn: () => getReservationsByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
};
