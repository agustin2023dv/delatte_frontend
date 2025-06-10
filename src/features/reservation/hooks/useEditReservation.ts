// src/app/features/reservations/hooks/useEditReservation.ts

import { useCallback } from 'react';
import { updateReservation as updateReservationService } from '../services/reservationBaseApiService';
import { IUpdateReservationDTO } from '@delatte/shared/dtos';

/**
 * Hook para editar una reserva.
 */
export const useEditReservation = () => {
  const editReservation = useCallback(async (reservationId: string, data: IUpdateReservationDTO) => {
    return await updateReservationService(reservationId, data);
  }, []);

  return {
    editReservation,
  };
};