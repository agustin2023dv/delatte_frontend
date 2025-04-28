// src/app/features/customer/hooks/useFavoriteRestaurants.ts

import { useQuery } from '@tanstack/react-query';
import { getFavoriteRestaurantsDetails } from '../services/userFavoritesApiService';
import { useUserFavorites } from './useUserFavorites';
import { IRestaurant } from '@delatte/shared/interfaces';

/**
 * Hook para obtener los restaurantes favoritos del usuario autenticado.
 */
export const useFavoriteRestaurants = () => {
  const { favorites, isLoadingFavorites } = useUserFavorites();

  const { data, isLoading, isError } = useQuery<IRestaurant[]>({
    queryKey: ['favoriteRestaurants', favorites],
    queryFn: () => getFavoriteRestaurantsDetails(favorites.map(id => id.toString())),
    enabled: favorites.length > 0, // Solo consulta si hay favoritos
  });

  return {
    favoriteRestaurants: data ?? [],
    isLoadingFavoriteRestaurants: isLoading || isLoadingFavorites,
    isErrorFavoriteRestaurants: isError,
  };
};
