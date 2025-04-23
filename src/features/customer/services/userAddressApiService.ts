// src/app/features/customer/services/userAddressApiService.ts

import { axiosInstance } from "src/lib/axios/axiosInstance";



/**
 * Obtiene todas las direcciones del usuario autenticado.
 */
export const getUserAddresses = async (): Promise<string[]> => {
  const response = await axiosInstance.get('/user/addresses');
  return response.data;
};

/**
 * Agrega una nueva dirección para el usuario autenticado.
 * @param address Dirección a agregar
 */
export const addUserAddress = async (address: string): Promise<string[]> => {
  const response = await axiosInstance.post('/user/addresses', { address });
  return response.data;
};

/**
 * Elimina una dirección del usuario autenticado.
 * @param address Dirección a eliminar
 */
export const removeUserAddress = async (address: string): Promise<string[]> => {
  const response = await axiosInstance.delete('/user/addresses', {
    data: { address },
  });
  return response.data;
};
