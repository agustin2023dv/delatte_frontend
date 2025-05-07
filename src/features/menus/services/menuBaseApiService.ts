import { axiosInstance } from 'src/lib/axios/axiosInstance';
import {
  ICreateMenuDTO,
  IMenuResponseDTO,
  IUpdateMenuDTO
} from '@delatte/shared/dtos';

export const getMenusByRestaurant = async (restaurantId: string): Promise<IMenuResponseDTO[]> => {
  const response = await axiosInstance.get(`/menus/restaurant/${restaurantId}`);
  return response.data;
};

export const createMenu = async (data: ICreateMenuDTO): Promise<IMenuResponseDTO> => {
  const response = await axiosInstance.post('/menus', data);
  return response.data;
};

export const updateMenu = async (
  menuId: string,
  data: IUpdateMenuDTO
): Promise<IMenuResponseDTO> => {
  const response = await axiosInstance.put(`/menus/${menuId}`, data);
  return response.data;
};

export const deleteMenu = async (menuId: string): Promise<void> => {
  await axiosInstance.delete(`/menus/${menuId}`);
};
