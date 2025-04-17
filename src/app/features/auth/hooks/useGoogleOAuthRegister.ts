/**
 * 🆕 Hook `useGoogleOAuthRegister`
 *
 * Encapsula el flujo de registro mediante Google OAuth 2.0.
 *
 * ✔️ Envía el token de Google al backend (`POST /auth/google/register`)
 * ✔️ Si el email ya existe, muestra error
 * ✔️ Devuelve el usuario creado (sin iniciar sesión)
 *
 * Este hook se utiliza luego de obtener el `accessToken` con `useOAuth`.
 */

import { useState } from 'react';
import { registerWithGoogle } from '../services/authAccessApiService';
import { IUser } from '@delatte/shared/interfaces';

export const useGoogleOAuthRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  /**
   * Envía el token de Google al backend para registrar el usuario.
   *
   * @param accessToken Token OAuth válido de Google
   * @returns Usuario registrado
   * @throws Error si ya existe o hay un fallo
   */
  const handleGoogleRegister = async (accessToken: string): Promise<IUser> => {
    setLoading(true);
    setError(null);

    try {
      const newUser = await registerWithGoogle(accessToken);
      setUser(newUser);
      return newUser;
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'Error inesperado al registrarse con Google';
      setError(msg);
      alert(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGoogleRegister,
    user,
    loading,
    error,
  };
};
