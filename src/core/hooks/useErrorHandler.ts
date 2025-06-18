// src/core/hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { AxiosError } from 'axios';

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown, context?: string) => {
    let errorMessage = 'Ocurrió un error';
    
    if (error instanceof AxiosError) {
      // Manejo de errores de Axios
      errorMessage = error.response?.data?.message || 
                    error.message || 
                    'Error de conexión';
    } else if (error instanceof Error) {
      // Manejo de errores estándar
      errorMessage = error.message;
    }

    console.error(`❌ ${context || 'Error'}:`, error);
    Alert.alert(context || 'Error', errorMessage);
  }, []);

  return { handleError };
};