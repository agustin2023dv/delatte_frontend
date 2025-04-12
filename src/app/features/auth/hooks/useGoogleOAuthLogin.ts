/**
 * ☁️ Hook `useGoogleOAuthLogin`
 *
 * Encapsula el flujo de autenticación mediante Google OAuth 2.0.
 *
 * ✔️ Envía el token de Google al backend (`POST /auth/google`)
 * ✔️ Si el usuario no existe, lo registra automáticamente como `customer`
 * ✔️ Transforma el objeto `IUser → IAuthenticatedUser`
 * ✔️ Actualiza el `AuthContext` con la sesión activa
 *
 * Este hook se utiliza luego de obtener el `accessToken` con `useOAuth`.
 */


//src/features/auth/hooks/useGoogleOAuthLogin.ts

import { useState } from 'react';
import { loginOrRegisterWithGoogle } from '../services/authAccessApiService';
import { useAuthContext } from 'src/context/AuthContext';
import { toAuthenticatedUser } from '@shared/transformers/userTransformer';

export const useGoogleOAuthLogin = () => {
  const [loading, setLoading] = useState(false); // ⏳ Estado de carga
  const [error, setError] = useState<string | null>(null); // ⚠️ Estado de error

  const { login } = useAuthContext(); // 🔐 Función para iniciar sesión global

  /**
   * Envía el token de Google al backend y gestiona el login/registro.
   *
   * @param accessToken Token de acceso válido obtenido de Google
   */
  const handleGoogleLogin = async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const { token, user } = await loginOrRegisterWithGoogle(accessToken);
      login(toAuthenticatedUser(user), token);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    loading,
    error,
  };
};
