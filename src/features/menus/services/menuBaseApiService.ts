// src/app/features/menus/services/menuBaseApiService.ts

import { axiosInstance } from 'src/lib/axios/axiosInstance';
import {
  ICreateMenuDTO,
  IMenuResponseDTO,
  IUpdateMenuDTO
} from '@delatte/shared/dtos';

/**
 * Obtener menús por restaurante
 */
export const getMenusByRestaurant = async (
  restaurantId: string
): Promise<IMenuResponseDTO[]> => {
  try {
    const response = await axiosInstance.get(`/menus/restaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener menús del restaurante:', error);
    throw error;
  }
};

/**
 * Crear un nuevo menú
 */
export const createMenu = async (
  data: ICreateMenuDTO
): Promise<IMenuResponseDTO> => {
  try {
    const response = await axiosInstance.post('/menus', data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear el menú:', error);
    throw error;
  }
};

/**
 * Actualizar un menú existente
 */
export const updateMenu = async (
  menuId: string,
  data: IUpdateMenuDTO
): Promise<IMenuResponseDTO> => {
  try {
    const response = await axiosInstance.put(`/menus/${menuId}`, data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar el menú:', error);
    throw error;
  }
};

/**
 * Eliminar un menú
 */
export const deleteMenu = async (menuId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/menus/${menuId}`);
  } catch (error) {
    console.error('❌ Error al eliminar el menú:', error);
    throw error;
  }
};

/**
 * Obtener un menú por su ID
 */
export const getMenuById = async (
  menuId: string
): Promise<IMenuResponseDTO> => {
  try {
    const response = await axiosInstance.get(`/menus/${menuId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener el menú por ID:', error);
    throw error;
  }
};
