/**
 * 📝 Hook `useRegisterUser`
 * 
 * Encapsula el flujo de registro manual para nuevos usuarios.
 * 
 * ✔️ Llama al endpoint `POST /users` con los datos del formulario
 * ✔️ Maneja estado de carga (`loading`) y errores (`error`)
 * ✔️ Devuelve el usuario registrado (sin iniciar sesión automáticamente)
 * 
 * Este hook es reutilizable para cualquier tipo de usuario que se registre manualmente
 * a través del endpoint genérico `/users`, actualmente utilizado por clientes (`customer`).
 */

// src/features/auth/hooks/useRegisterUser.ts

import { useState } from 'react';
import { registerCustomer } from '../services/authAccessApiService';
import { ICustomerRegistrationDTO } from '@delatte/shared/dtos';
import { IUser } from '@delatte/shared/interfaces';

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false); // ⏳ Estado de carga
  const [error, setError] = useState<string | null>(null); // ⚠️ Estado de error

  /**
   * Ejecuta la lógica de registro de un usuario.
   * 
   * @param data Datos del nuevo usuario (nombre, email, etc.)
   * @returns Usuario registrado
   * @throws Error si falla el registro
   */
  const handleRegister = async (
    data: ICustomerRegistrationDTO
  ): Promise<IUser> => {
    setLoading(true);
    setError(null);
    try {
      const user = await registerCustomer(data);
      return user;
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error inesperado');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
    error,
  };
};
