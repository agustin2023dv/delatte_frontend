/**
 * Hook `useResetPassword`
 *
 * Permite restablecer la contraseña utilizando el token recibido por email.
 *
 * 👉 Llama a: POST /users/password-resets
 * ✅ Usa el DTO `IPasswordForgotDTO`
 */

import { useState, useCallback } from 'react';
import { resetPassword } from '../services/authUserApiService';
import { IPasswordForgotDTO } from '@delatte/shared/dtos';

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleResetPassword = useCallback(
    async (data: IPasswordForgotDTO) => {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        await resetPassword(data);
        setSuccessMessage('Tu contraseña fue restablecida con éxito.');
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'No se pudo restablecer la contraseña.'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    handleResetPassword,
    loading,
    successMessage,
    errorMessage,
  };
};
