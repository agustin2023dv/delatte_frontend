// src/app/features/reviews/services/reviewBaseApiService.ts


import {
  ICreateReviewDTO,
  IUpdateReviewDTO,
  IReviewResponseDTO,
} from '@delatte/shared/dtos';
import { axiosInstance } from 'src/lib/axios/axiosInstance';


/**
 * Obtener reseñas por restaurante.
 */
export const getReviewsByRestaurant = async (
  restaurantId: string
): Promise<IReviewResponseDTO[]> => {
  const response = await axiosInstance.get(`/reviews/restaurants/${restaurantId}`);
  return response.data;
};

/**
 * Obtener reseñas por usuario.
 */
export const getReviewsByUser = async (
  userId: string
): Promise<IReviewResponseDTO[]> => {
  const response = await axiosInstance.get(`/reviews/users/${userId}`);
  return response.data;
};

/**
 * Crear una nueva reseña.
 */
export const createReview = async (
  data: ICreateReviewDTO
): Promise<IReviewResponseDTO> => {
  const response = await axiosInstance.post('/reviews', data);
  return response.data.review; // viene en { message, review }
};

/**
 * Actualizar una reseña.
 */
export const updateReview = async (
  reviewId: string,
  data: IUpdateReviewDTO
): Promise<IReviewResponseDTO> => {
  const response = await axiosInstance.put(`/reviews/${reviewId}`, data);
  return response.data;
};

/**
 * Eliminar una reseña.
 */
export const deleteReview = async (reviewId: string): Promise<void> => {
  await axiosInstance.delete(`/reviews/${reviewId}`);
};
