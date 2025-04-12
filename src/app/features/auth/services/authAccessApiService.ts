/**
 * Servicio de API para autenticación y registro de usuarios.
 *
 * 📌 Refleja el controller: userAccess.controller.ts
 *
 * Incluye funciones que interactúan con el backend:
 * - Registro de cliente (POST /users)
 * - Login cliente (POST /auth)
 * - Login manager (POST /auth/manager)
 * - Login/register con Google (POST /auth/google)
 */

import { axiosInstance } from 'src/lib/axios/axiosInstance';
import { ICustomerRegistrationDTO, ILoginDTO } from '@delatte/shared/dtos';
import { IUser } from '@delatte/shared/interfaces';

/**
 * Registra un nuevo cliente en la plataforma.
 *
 * @param data Objeto con nombre, apellido, email y contraseña
 * @returns Usuario creado (sin token)
 * @throws Error si la solicitud falla
 */
export const registerCustomer = async (
  data: ICustomerRegistrationDTO
): Promise<IUser> => {
  const response = await axiosInstance.post('/users', data);
  return response.data.user; // el backend devuelve `{ message, user }`
};

/**
 * Inicia sesión como cliente con email y contraseña.
 *
 * @param credentials Objeto con email y contraseña
 * @returns Objeto con el token JWT y los datos del usuario
 * @throws Error si la autenticación falla
 */
export const loginCustomer = async (
  credentials: ILoginDTO
): Promise<{ token: string; user: IUser }> => {
  const response = await axiosInstance.post('/auth', credentials);
  return response.data;
};

/**
 * Inicia sesión como manager de restaurante con email y contraseña.
 *
 * @param credentials Objeto con email y contraseña
 * @returns Objeto con token JWT y datos del usuario
 * @throws Error si la autenticación falla
 */
export const loginManager = async (
  credentials: ILoginDTO
): Promise<{ token: string; user: IUser }> => {
  const response = await axiosInstance.post('/auth/manager', credentials);
  return response.data;
};

/**
 * Inicia sesión o registra automáticamente a un usuario con Google OAuth.
 *
 * @param accessToken Token de Google obtenido desde el frontend
 * @returns Objeto con token JWT y datos del usuario
 * @throws Error si el token de Google no es válido
 */
export const loginOrRegisterWithGoogle = async (
  accessToken: string
): Promise<{ token: string; user: IUser }> => {
  const response = await axiosInstance.post('/auth/google', { accessToken });
  return response.data;
};
