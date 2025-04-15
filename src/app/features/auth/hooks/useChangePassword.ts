/**
 * 🛡️ Hook `useChangePassword`
 *
 * Permite a un usuario autenticado actualizar su contraseña actual por una nueva.
 *
 * ✔️ Llama al endpoint: `PUT /users/password`
 * ✔️ Utiliza el DTO `IPasswordResetWithOldDTO` para tipado seguro
 * ✔️ Expone estados de carga, éxito y error
 *
 * Este hook puede ser utilizado en la sección "Seguridad" del perfil de usuario.
 */

import { useState, useCallback } from 'react';
import { changePassword } from '../services/authUserApiService';
import { IPasswordResetWithOldDTO } from '@delatte/shared/dtos';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Cambia la contraseña del usuario autenticado.
   *
   * @param data Objeto con contraseña actual, nueva y confirmación
   */
  const handleChangePassword = useCallback(
    async (data: IPasswordResetWithOldDTO) => {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      try {
        await changePassword(data);
        setSuccessMessage('Contraseña actualizada con éxito.');
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'No se pudo actualizar la contraseña.'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    handleChangePassword,
    loading,
    successMessage,
    errorMessage,
  };
};
