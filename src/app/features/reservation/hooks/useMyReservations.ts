import { useEffect, useState } from 'react';
import { getOwnReservations } from '../services/reservationBaseApiService';
import { IReservationResponseDTO } from '@delatte/shared/dtos';

export const useMyReservations = () => {
  const [reservations, setReservations] = useState<IReservationResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getOwnReservations();
      setReservations(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener tus reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
    error,
    refetch: fetchReservations,
  };
};
