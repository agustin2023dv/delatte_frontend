/**
 * 🍽️ Servicio de API para gestión de restaurantes (base).
 *
 * 📌 Incluye funciones que interactúan con el backend:
 * - Registrar restaurante junto con su manager (POST /restaurants)
 * - Obtener todos los restaurantes (GET /restaurants)
 * - Obtener restaurante por ID (GET /restaurants/:id)
 * - Obtener restaurantes por manager (GET /restaurants/managers/:id/restaurants)
 */

import axios from 'axios';
import {
  IRestaurantRegistrationDTO,
  IManagerRegistrationDTO,
} from '@delatte/shared/dtos';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Registra un nuevo restaurante junto con su manager.
 *
 * @param restaurant Datos básicos del restaurante (nombre, dirección, código postal)
 * @param manager Datos del manager (nombre, apellido, email, contraseña)
 * @returns Restaurante creado
 * @throws Error si la solicitud falla
 */
export const registerRestaurantAndManager = async (
  restaurant: IRestaurantRegistrationDTO,
  manager: IManagerRegistrationDTO
): Promise<{ restaurant: IRestaurant }> => {
  const response = await axios.post('/restaurants', {
    restaurant,
    manager,
  });
  return response.data;
};

/**
 * Obtiene todos los restaurantes disponibles.
 *
 * @returns Lista de restaurantes
 * @throws Error si la solicitud falla
 */
export const getAllRestaurants = async (): Promise<IRestaurant[]> => {
  const response = await axios.get('/restaurants');
  return response.data;
};

/**
 * Obtiene un restaurante por su ID.
 *
 * @param id ID del restaurante
 * @returns Restaurante correspondiente
 * @throws Error si la solicitud falla
 */
export const getRestaurantById = async (id: string): Promise<IRestaurant> => {
  const response = await axios.get(`/restaurants/${id}`);
  return response.data;
};

/**
 * Obtiene todos los restaurantes gestionados por un manager.
 *
 * @param managerId ID del manager
 * @returns Lista de restaurantes
 * @throws Error si la solicitud falla
 */
export const getRestaurantsByManager = async (
  managerId: string
): Promise<IRestaurant[]> => {
  const response = await axios.get(`/restaurants/managers/${managerId}/restaurants`);
  return response.data;
};
