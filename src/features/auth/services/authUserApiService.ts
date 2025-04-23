/**
 * Servicio de API para recuperación de contraseña y verificación de email.
 *
 * 🔐 Refleja el controller: userAuth.controller.ts
 * 
 * Incluye funciones que interactúan con el backend:
 * - Verificación de email
 * - Solicitud de recuperación de contraseña
 * - Restablecimiento con token
 * - Cambio de contraseña autenticado
 */

import { axiosInstance } from 'src/lib/axios/axiosInstance';
import {
  IPasswordForgotDTO,
  IPasswordResetWithOldDTO,
} from '@delatte/shared/dtos';

/**
 * Verifica el correo electrónico mediante un token.
 *
 * @param token Token recibido por correo
 * @throws Error si el token es inválido o expiró
 */
export const verifyEmail = async (token: string): Promise<void> => {
  await axiosInstance.post(`/users/email-verification?token=${token}`);
};

/**
 * Solicita el restablecimiento de contraseña mediante email.
 *
 * @param email Correo del usuario
 * @throws Error si el correo no está registrado
 */
export const requestPasswordReset = async (email: string): Promise<void> => {
  await axiosInstance.post('/users/password-reset-requests', { email });
};

/**
 * Restablece la contraseña usando un token recibido por correo.
 *
 * @param data Objeto con token, nueva contraseña y confirmación
 * @throws Error si el token es inválido o expiró
 */
export const resetPassword = async (
  data: IPasswordForgotDTO
): Promise<void> => {
  await axiosInstance.post('/users/password-resets', data);
};

/**
 * Cambia la contraseña actual del usuario autenticado.
 *
 * @param data Objeto con contraseña actual, nueva contraseña y confirmación
 * @throws Error si la contraseña actual no es válida
 */
export const changePassword = async (
  data: IPasswordResetWithOldDTO
): Promise<void> => {
  await axiosInstance.put('/users/password', data);
};
