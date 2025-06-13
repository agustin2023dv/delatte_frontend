// src/app/features/reservation/hooks/useGetReservationById.ts

import { useQuery } from '@tanstack/react-query';
import { getReservationById } from '../services/reservationBaseApiService';
import { IReservationResponseDTO } from '@delatte/shared/dtos';

/**
 * Hook para obtener una reserva por su ID.
 */
export const useGetReservationById = (id: string) => {
  const query = useQuery<IReservationResponseDTO>({
    queryKey: ['reservation', id],
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });

  return {
    reservation: query.data,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
};
