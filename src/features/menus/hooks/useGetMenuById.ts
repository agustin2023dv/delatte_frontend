// src/features/menus/hooks/useGetMenuById.ts
import { useQuery } from '@tanstack/react-query';
import { IMenuResponseDTO } from '@delatte/shared/dtos';
import { useEffect } from 'react';
import { getMenuById } from '../services/menuBaseApiService';
import { useErrorHandler } from 'src/core/hooks/useErrorHandler';

export const useGetMenuById = (menuId: string | undefined) => {
  const { handleError } = useErrorHandler();

  const query = useQuery<IMenuResponseDTO, Error>({
    queryKey: ['menu', menuId],
    queryFn: () => {
      if (!menuId) throw new Error('ID de menú no proporcionado');
      return getMenuById(menuId);
    },
    enabled: !!menuId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.message.includes('404')) return false;
      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (query.error) {
      handleError(query.error, 'Error al cargar menú');
    }
  }, [query.error, handleError]);

  return query; 
};
