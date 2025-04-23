// src/app/features/promotions/services/promotionBaseApiService.ts

import {
  ICreatePromotionDTO,
  IUpdatePromotionDTO,
  IPromotionResponseDTO,
} from '@delatte/shared/dtos';
import { axiosInstance } from 'src/lib/axios/axiosInstance';

/**
 * Crea una nueva promoción para un restaurante.
 * @param restaurantId ID del restaurante
 * @param data Datos de la promoción
 */
export const createPromotion = async (
  restaurantId: string,
  data: ICreatePromotionDTO
): Promise<IPromotionResponseDTO> => {
  const response = await axiosInstance.post(`/promotions/${restaurantId}`, data);
  return response.data;
};

/**
 * Obtiene todas las promociones asociadas a un restaurante.
 * @param restaurantId ID del restaurante
 */
export const getPromotionsByRestaurant = async (
  restaurantId: string
): Promise<IPromotionResponseDTO[]> => {
  const response = await axiosInstance.get(`/promotions/${restaurantId}`);
  return response.data;
};

/**
 * Actualiza una promoción existente.
 * @param restaurantId ID del restaurante
 * @param promotionId ID de la promoción
 * @param data Datos modificados
 */
export const updatePromotion = async (
  restaurantId: string,
  promotionId: string,
  data: IUpdatePromotionDTO
): Promise<IPromotionResponseDTO> => {
  const response = await axiosInstance.put(
    `/promotions/${restaurantId}/promotions/${promotionId}`,
    data
  );
  return response.data;
};

/**
 * Elimina una promoción existente.
 * @param restaurantId ID del restaurante
 * @param promotionId ID de la promoción
 */
export const deletePromotion = async (
  restaurantId: string,
  promotionId: string
): Promise<void> => {
  await axiosInstance.delete(`/promotions/${restaurantId}/promotions/${promotionId}`);
};


/**
 * Obtiene las promociones activas (públicas).
 * @param page Página de resultados
 * @param limit Cantidad por página
 */
export const getActivePromotions = async (
    page: number = 1,
    limit: number = 10
  ): Promise<IPromotionResponseDTO[]> => {
    const response = await axiosInstance.get('/promotions/active', {
      params: { page, limit },
    });
    return response.data;
  };
  