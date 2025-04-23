// src/app/features/promotions/hooks/usePromotions.ts

import { useState, useEffect } from 'react';
import {
  getPromotionsByRestaurant,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from '../services/promotionBaseApiService';
import {
  ICreatePromotionDTO,
  IUpdatePromotionDTO,
  IPromotionResponseDTO,
} from '@delatte/shared/dtos';

export const usePromotions = (restaurantId: string) => {
  const [promotions, setPromotions] = useState<IPromotionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const data = await getPromotionsByRestaurant(restaurantId);
      setPromotions(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al obtener promociones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePromotion = async (dto: ICreatePromotionDTO) => {
    try {
      const newPromo = await createPromotion(restaurantId, dto);
      setPromotions(prev => [...prev, newPromo]);
      return newPromo;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || 'Error al crear promoción');
    }
  };

  const handleUpdatePromotion = async (
    promotionId: string,
    dto: IUpdatePromotionDTO
  ) => {
    try {
      const updatedPromo = await updatePromotion(restaurantId, promotionId, dto);
      setPromotions(prev =>
        prev.map(promo => (promo._id === promotionId ? updatedPromo : promo))
      );
      return updatedPromo;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || 'Error al actualizar promoción');
    }
  };

  const handleDeletePromotion = async (promotionId: string) => {
    try {
      await deletePromotion(restaurantId, promotionId);
      setPromotions(prev => prev.filter(promo => promo._id !== promotionId));
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || 'Error al eliminar promoción');
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [restaurantId]);

  return {
    promotions,
    loading,
    error,
    refetch: fetchPromotions,
    createPromotion: handleCreatePromotion,
    updatePromotion: handleUpdatePromotion,
    deletePromotion: handleDeletePromotion,
  };
};
