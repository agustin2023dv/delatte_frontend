// src/app/features/reservations/hooks/useCreateReservation.ts

import { useCallback } from 'react';
import { createReservation as createReservationService } from '../services/reservationBaseApiService';
import { ICreateReservationDTO } from '@delatte/shared/dtos';

export const useCreateReservation = () => {
  const createReservation = useCallback(async (data: ICreateReservationDTO) => {
    return await createReservationService(data);
  }, []);

  return {
    createReservation,
  };
};