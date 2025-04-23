import { useEffect, useState } from 'react';
import { getReviewsByUser } from '../services/reviewBaseApiService';
import { IReviewResponseDTO } from '@delatte/shared/dtos';
import { useAuthContext } from 'src/core/context/AuthContext';

export const useMyReviews = () => {
  const { user } = useAuthContext();
  const [reviews, setReviews] = useState<IReviewResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const data = await getReviewsByUser(user._id);
      setReviews(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener tus reseñas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?._id]);

  return {
    reviews,
    loading,
    error,
    refetch: fetchReviews,
  };
};
