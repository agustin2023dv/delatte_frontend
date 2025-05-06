import { useState } from 'react';
import { updateReview } from '../services/reviewBaseApiService';
import { IReviewResponseDTO, IUpdateReviewDTO } from '@delatte/shared/dtos';

export const useUpdateReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editReview = async (
    reviewId: string,
    data: IUpdateReviewDTO
  ): Promise<IReviewResponseDTO | null> => {
    try {
      setLoading(true);
      const updated = await updateReview(reviewId, data);
      return updated;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar la reseña');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editReview, loading, error };
};
