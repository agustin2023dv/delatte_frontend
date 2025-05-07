// src/app/features/users/customer/hooks/useUserFavorites.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserFavorites, addUserFavorite, removeUserFavorite } from '../customer/services/userFavoritesApiService';
import { IUserFavorites } from '@delatte/shared/interfaces';

/**
 * Hook para gestionar los restaurantes favoritos del usuario autenticado.
 */
export const useUserFavorites = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<IUserFavorites>({
    queryKey: ['userFavorites'],
    queryFn: getUserFavorites,
  });

  const addFavorite = useMutation({
    mutationFn: addUserFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: removeUserFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userFavorites'] });
    },
  });

  return {
    favorites: data?.favoriteRestaurants ?? [],
    isLoadingFavorites: isLoading,
    isErrorFavorites: isError,
    addFavorite: addFavorite.mutateAsync,
    removeFavorite: removeFavorite.mutateAsync,
  };
};
