/**
 * Hook para verificar el correo electrónico mediante un token.
 * 
 * 👉 Llama a: POST /users/email-verification?token=...
 */

import { useState, useCallback } from 'react';
import { verifyEmail } from '../services/authUserApiService';

export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerifyEmail = useCallback(async (token: string) => {
    setLoading(true);
    setSuccess(null);
    setErrorMessage(null);

    try {
      await verifyEmail(token);
      setSuccess(true);
    } catch (error: any) {
      setSuccess(false);
      setErrorMessage(
        error.response?.data?.message || 'No se pudo verificar el correo electrónico.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    handleVerifyEmail,
    loading,
    success,
    errorMessage,
  };
};
