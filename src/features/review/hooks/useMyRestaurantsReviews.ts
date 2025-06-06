// src/app/features/reviews/hooks/useMyRestaurantsReviews.ts

import { useEffect, useState } from 'react';
import { IReviewResponseDTO } from '@delatte/shared/dtos';
import { getReviewsByManager } from '../services/reviewManagerApiService';

export const useMyRestaurantsReviews = (managerId: string) => {
  const [reviews, setReviews] = useState<IReviewResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByManager(managerId);
      setReviews(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener reseñas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (managerId) fetchReviews();
  }, [managerId]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};
