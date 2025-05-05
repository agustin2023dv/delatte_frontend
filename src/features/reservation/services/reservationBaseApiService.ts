// src/app/features/reservations/services/reservationBaseApiService.ts

import {
  ICreateReservationDTO,
  IReservationResponseDTO,
  IUpdateReservationDTO,
} from '@delatte/shared/dtos';
import { axiosInstance } from 'src/lib/axios/axiosInstance';

/**
 * Crear una nueva reserva.
 */
export const createReservation = async (
  data: ICreateReservationDTO
): Promise<IReservationResponseDTO> => {
  const response = await axiosInstance.post('/reservations', data);
  return response.data;
};

/**
 * Obtener las reservas propias del usuario autenticado (customer o manager).
 */
export const getOwnReservations = async (): Promise<IReservationResponseDTO[]> => {
  const response = await axiosInstance.get('/reservations');
  return response.data;
};

/**
 * Obtener todas las reservas de un restaurante (manager o superadmin).
 */
export const getReservationsByRestaurant = async (
  restaurantId: string
): Promise<IReservationResponseDTO[]> => {
  const response = await axiosInstance.get(`/reservations/restaurant/${restaurantId}`);
  return response.data;
};

/**
 * Obtener todas las reservas de un usuario (superadmin).
 */
export const getReservationsByUser = async (
  userId: string
): Promise<IReservationResponseDTO[]> => {
  const response = await axiosInstance.get(`/reservations/user/${userId}`);
  return response.data;
};

/**
 * Obtener una reserva específica por su ID.
 */
export const getReservationById = async (
  reservationId: string
): Promise<IReservationResponseDTO> => {
  const response = await axiosInstance.get(`/reservations/${reservationId}`);
  return response.data;
};

/**
 * Cancelar una reserva existente.
 */
export const cancelReservation = async (
  reservationId: string
): Promise<IReservationResponseDTO> => {
  const response = await axiosInstance.put(`/reservations/${reservationId}/cancel`);
  return response.data;
};

/**
 * Actualizar una reserva existente.
 */
export const updateReservation = async (
  reservationId: string,
  data: IUpdateReservationDTO
): Promise<IReservationResponseDTO> => {
  const response = await axiosInstance.put(`/reservations/${reservationId}`, data);
  return response.data;
};

/**
 * Obtener todas las reservas del sistema (solo superadmins).
 */
export const getAllReservations = async (): Promise<IReservationResponseDTO[]> => {
  const response = await axiosInstance.get('/reservations/all');
  return response.data;
};
