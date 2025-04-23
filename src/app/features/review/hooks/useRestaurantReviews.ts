import { useEffect, useState } from 'react';
import { getReviewsByRestaurant } from '../services/reviewBaseApiService';
import { IReviewResponseDTO } from '@delatte/shared/dtos';

export const useRestaurantReviews = (restaurantId: string) => {
  const [reviews, setReviews] = useState<IReviewResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByRestaurant(restaurantId);
      setReviews(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener reseñas del restaurante');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) fetchReviews();
  }, [restaurantId]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};
