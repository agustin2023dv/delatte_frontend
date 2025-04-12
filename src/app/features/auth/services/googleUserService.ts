/**
 * Servicio que gestiona la integración del login/signup con Google.
 * 
 * 🚀 Se encarga de:
 * - Enviar el access token de Google al backend
 * - Recibir los datos del usuario y el JWT de tu API
 * - Guardar el token localmente (SecureStore)
 * - Actualizar el estado global con `AuthContext`
 */

// src/app/features/auth/services/googleUserService.ts

import { IAuthenticatedUser } from '../../../../core/types/IAuthenticatedUser';
import { useAuthContext } from '../../../../context/AuthContext';
import { saveToken } from './authService';

/**
 * Hook que encapsula la lógica de comunicación entre Google OAuth
 * y el backend para autenticar usuarios en Delatte.
 */
export const useGoogleUserService = () => {
  const { login } = useAuthContext();

  /**
   * Envía el token OAuth de Google al backend y gestiona la respuesta.
   *
   * @param googleAccessToken Token obtenido mediante OAuth 2.0 con Google
   * @throws Si el backend responde con error o no se recibe token válido
   */
  const authenticateWithGoogle = async (googleAccessToken: string): Promise<void> => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL_WEB}/auth/google`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error inesperado al autenticar con Google');
      }

      // Se espera que el backend devuelva: { token: string, user: IAuthenticatedUser }
      const { token, user }: { token: string; user: IAuthenticatedUser } = await response.json();

      await saveToken(token);   // 🔐 Guarda el token en almacenamiento seguro
      login(user, token);       // 🔄 Actualiza el AuthContext con los nuevos datos

    } catch (error: any) {
      console.error('❌ Falló la autenticación con Google:', error?.message || error);
      throw error;
    }
  };

  return {
    authenticateWithGoogle,
  };
};
