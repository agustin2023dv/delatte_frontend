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
import { loginCustomer, loginManager } from '../services/authAccessApiService';
import { useAuthContext } from 'src/core/context/AuthContext';
import { toAuthenticatedUser } from '@shared/transformers/userTransformer';
import { ILoginDTO } from '@delatte/shared/dtos';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();

  const handleLogin = async ({ email, password }: ILoginDTO) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Intentando login con:', email);
      const { token, user } = await loginCustomer({ email, password });
      console.log('✅ Login como customer OK:', user);
      return login(toAuthenticatedUser(user), token);
    } catch (errCustomer: any) {
      console.warn('❌ Login customer falló:', errCustomer?.response?.data);

      try {
        const { token, user } = await loginManager({ email, password });
        console.log('✅ Login como manager OK:', user);
        return login(toAuthenticatedUser(user), token);
      } catch (errManager: any) {
        console.error('❌ Login manager falló:', errManager?.response?.data);
        setError(errManager?.response?.data?.message || errManager.message || 'Error inesperado');
        throw errManager;
      }
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
