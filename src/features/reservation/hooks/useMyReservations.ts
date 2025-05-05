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

      if (Array.isArray(data)) {
        setReservations(data);
      } else {
        console.warn('⚠️ Respuesta inesperada al obtener reservas:', data);
        setReservations([]); // garantiza un array para evitar fallos
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener tus reservas');
      setReservations([]); // fallback seguro en caso de error
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
