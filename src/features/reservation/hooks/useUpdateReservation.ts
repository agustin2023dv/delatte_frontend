// src/app/features/reservation/hooks/useUpdateReservation.ts

import { useMutation } from '@tanstack/react-query';
import { updateReservation } from '../services/reservationBaseApiService';
import { IUpdateReservationDTO } from '@delatte/shared/dtos';

export const useUpdateReservation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateReservationDTO }) =>
      updateReservation(id, data),
  });
};