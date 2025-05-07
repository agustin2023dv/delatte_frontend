// src/shared/components/ui/FavoriteButton.tsx

import React, { useMemo } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserFavorites } from '@features/users/hooks/useUserFavorites';

interface FavoriteButtonProps {
  restaurantId: string;
  size?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ restaurantId, size = 28 }) => {
  const { favorites, isLoadingFavorites, addFavorite, removeFavorite } = useUserFavorites();

  const isFavorite = useMemo(() => {
    return favorites.some(fav => fav.toString() === restaurantId);
  }, [favorites, restaurantId]);
  

  const handlePress = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(restaurantId);
      } else {
        await addFavorite(restaurantId);
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
    }
  };

  if (isLoadingFavorites) {
    return <ActivityIndicator size="small" />;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialCommunityIcons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? '#e63946' : '#999'}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
