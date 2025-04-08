/**
 * 🔐 Hook `useLogin`
 *
 * Maneja el flujo de autenticación por email/contraseña para cualquier rol (customer o manager).
 * 
 * ✔️ Determina dinámicamente a qué endpoint llamar según el email
 * ✔️ Transforma el usuario (`IUser → IAuthenticatedUser`)
 * ✔️ Actualiza el AuthContext
 */

import { useState } from 'react';
import { loginCustomer, loginManager } from '../services/authApiService';
import { useAuthContext } from 'src/app/context/AuthContext';
import { toAuthenticatedUser } from '@shared/transformers/userTransformer';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // 🔁 Intenta primero login como customer
      try {
        const { token, user } = await loginCustomer(email, password);
        return login(toAuthenticatedUser(user), token);
      } catch {
        // Si falla, intenta login como manager
        const { token, user } = await loginManager(email, password);
        return login(toAuthenticatedUser(user), token);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
