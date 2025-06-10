// src/app/features/reservations/hooks/useCancelReservation.ts

import { useCallback } from 'react';
import { cancelReservation as cancelReservationService } from '../services/reservationBaseApiService';

/**
 * Hook para cancelar una reserva.
 */
export const useCancelReservation = () => {
  const cancelReservation = useCallback(async (reservationId: string) => {
    return await cancelReservationService(reservationId);
  }, []);

  return {
    cancelReservation,
  };
};