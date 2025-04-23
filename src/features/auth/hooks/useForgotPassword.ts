/**
 * 📧 Hook `useForgotPassword`
 *
 * Permite a un usuario solicitar el envío de un email para restablecer su contraseña.
 *
 * ✔️ Llama al endpoint: `POST /users/password-reset-requests`
 * ✔️ Expone estados de carga, éxito y error
 * ✔️ Puede ser usado en la pantalla `ForgotPasswordScreen`
 */

import { useState, useCallback } from 'react';
import { requestPasswordReset } from '../services/authUserApiService';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Solicita el restablecimiento de contraseña para el email dado.
   *
   * @param email Correo electrónico del usuario
   */
  const sendPasswordResetEmail = useCallback(async (email: string) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await requestPasswordReset(email);
      setSuccessMessage('Te enviamos un correo para restablecer tu contraseña.');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Ocurrió un error al solicitar el restablecimiento.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendPasswordResetEmail,
    loading,
    successMessage,
    errorMessage,
  };
};
