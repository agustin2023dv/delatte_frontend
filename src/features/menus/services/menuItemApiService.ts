import { axiosInstance } from 'src/lib/axios/axiosInstance';
import {
  IAddMenuItemDTO,
  IRemoveMenuItemDTO,
  IUpdateMenuItemDTO,
  IMenuResponseDTO,
} from '@delatte/shared/dtos';

/**
 * Agrega un ítem a un menú existente
 */
export const addMenuItem = async ({
  menuId,
  item,
}: IAddMenuItemDTO): Promise<IMenuResponseDTO> => {
  const response = await axiosInstance.post(`/menus/${menuId}/items`, item);
  return response.data;
};

/**
 * Elimina un ítem de un menú
 */
export const removeMenuItem = async ({
  menuId,
  itemId,
}: IRemoveMenuItemDTO): Promise<IMenuResponseDTO> => {
  const response = await axiosInstance.delete(`/menus/${menuId}/items/${itemId}`);
  return response.data;
};

/**
 * Actualiza un ítem de un menú
 */
export const updateMenuItem = async ({
  menuId,
  itemId,
  item,
}: IUpdateMenuItemDTO): Promise<IMenuResponseDTO> => {
  const response = await axiosInstance.put(`/menus/${menuId}/items/${itemId}`, item);
  return response.data;
};
