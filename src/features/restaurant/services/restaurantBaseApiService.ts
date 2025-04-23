/**
 * Servicio de API para endpoints base de restaurantes.
 *
 * 📌 Refleja el controller: restaurantBase.controller.ts
 *
 * Incluye funciones que interactúan con el backend:
 * - Obtener todos los restaurantes (GET /restaurants)
 * - Obtener un restaurante por ID (GET /restaurants/:id)
 * - Obtener restaurantes de un manager (GET /restaurants/managers/:id/restaurants)
 * - Registrar restaurante y manager (POST /restaurants)
 * - Actualizar restaurante (PUT /restaurants/:id)
 */

import { axiosInstance } from 'src/lib/axios/axiosInstance';
import {
  IRestaurantRegistrationInitialDTO,
  IManagerRegistrationDTO,
} from '@delatte/shared/dtos';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Obtiene todos los restaurantes registrados en la plataforma.
 *
 * @returns Array de restaurantes
 */
export const getAllRestaurants = async (): Promise<IRestaurant[]> => {
  const response = await axiosInstance.get('/restaurants');
  return response.data;
};

/**
 * Obtiene los datos de un restaurante por su ID.
 *
 * @param id ID del restaurante
 * @returns Restaurante encontrado
 */
export const getRestaurantById = async (id: string): Promise<IRestaurant> => {
  const response = await axiosInstance.get(`/restaurants/${id}`);
  return response.data;
};

/**
 * Obtiene todos los restaurantes gestionados por un manager.
 *
 * @param managerId ID del manager
 * @returns Array de restaurantes gestionados
 */
export const getRestaurantsByManager = async (
  managerId: string
): Promise<IRestaurant[]> => {
  const response = await axiosInstance.get(
    `/restaurants/managers/${managerId}/restaurants`
  );
  return response.data;
};

/**
 * Registra un nuevo restaurante junto con el manager responsable.
 *
 * @param restaurant Datos iniciales del restaurante
 * @param manager Datos del manager
 * @returns Objeto con restaurante y manager creados
 */
export const registerRestaurantAndManager = async (
  restaurant: IRestaurantRegistrationInitialDTO,
  manager: IManagerRegistrationDTO
): Promise<{ restaurant: IRestaurant; manager: any }> => {
  const response = await axiosInstance.post('/restaurants', {
    restaurant,
    manager,
  });
  return response.data;
};

/**
 * Actualiza los datos de un restaurante.
 *
 * @param id ID del restaurante
 * @param data Datos actualizados
 * @returns Restaurante actualizado
 */
export const updateRestaurant = async (
  id: string,
  data: Partial<IRestaurant>
): Promise<IRestaurant> => {
  const response = await axiosInstance.put(`/restaurants/${id}`, data);
  return response.data;
};
