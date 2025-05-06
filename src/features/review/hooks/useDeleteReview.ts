import { useState } from 'react';
import { deleteReview } from '../services/reviewBaseApiService';

export const useDeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeReview = async (reviewId: string): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteReview(reviewId);
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al eliminar la reseña');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeReview, loading, error };
};
