/**
 * Servicio de API para autenticación y registro de usuarios.
 *
 * 📌 Incluye funciones que interactúan con el backend:
 * - Registro de cliente (POST /users)
 * - Login cliente
 * - Login manager
 * - Login/register con Google
 */

import axios from 'axios';
import { ICustomerRegistrationDTO } from '@delatte/shared/dtos';
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
  const response = await axios.post('/users', data);
  return response.data.user; // el backend devuelve `{ message, user }`
};

/**
 * Inicia sesión como cliente con email y contraseña.
 *
 * @param email Correo electrónico del usuario
 * @param password Contraseña en texto plano
 * @returns Objeto con el token JWT y los datos del usuario
 * @throws Error si la autenticación falla
 */
export const loginCustomer = async (
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> => {
    const response = await axios.post('/auth', { email, password });
    return response.data;
  };

  /**
 * Inicia sesión como manager de restaurante con email y contraseña.
 *
 * @param email Correo del manager
 * @param password Contraseña
 * @returns Objeto con token JWT y datos del usuario
 * @throws Error si la autenticación falla
 */
export const loginManager = async (
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> => {
    const response = await axios.post('/auth/manager', { email, password });
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
    const response = await axios.post('/auth/google', { accessToken });
    return response.data;
  };
  