import { useEffect, useState } from 'react';
import { getActivePromotions } from '../services/promotionBaseApiService';
import { IPromotionResponseDTO } from '@delatte/shared/dtos';

export const useActivePromotions = (page: number = 1, limit: number = 10) => {
  const [promotions, setPromotions] = useState<IPromotionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const data = await getActivePromotions(page, limit);
      setPromotions(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener promociones activas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [page, limit]);

  return {
    promotions,
    loading,
    error,
    refetch: fetchPromotions,
  };
};
