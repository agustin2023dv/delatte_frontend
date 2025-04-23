/**
 * ☁️ Hook `useGoogleOAuthLogin`
 *
 * Encapsula el flujo de autenticación mediante Google OAuth 2.0.
 *
 * ✔️ Envía el token de Google al backend (`POST /auth/google/login`)
 * ✔️ Transforma el objeto `IUser → IAuthenticatedUser`
 * ✔️ Actualiza el `AuthContext` con la sesión activa
 */

import { useState } from 'react';
import { loginWithGoogle } from '../services/authAccessApiService';
import { useAuthContext } from 'src/core/context/AuthContext';
import { toAuthenticatedUser } from '@shared/transformers/userTransformer';
import { saveToken } from '../services/authService';

export const useGoogleOAuthLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthContext();

  const handleGoogleLogin = async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const { token, user } = await loginWithGoogle(accessToken);
      await saveToken(token);
      login(toAuthenticatedUser(user), token);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Error inesperado';
      setError(msg);
      alert(msg);
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
