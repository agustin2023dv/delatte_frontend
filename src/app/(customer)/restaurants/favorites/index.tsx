// src/app/(customer)/restaurants/favorites/index.tsx

import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFavoriteRestaurants } from '@features/users/customer/hooks/useFavoriteRestaurants';
import { useUserFavorites } from '@features/users/hooks/useUserFavorites';
import RestaurantCard from '@shared/components/restaurant/RestaurantCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * 📄 Pantalla `FavoritesScreen`
 *
 * Muestra la lista de restaurantes que el usuario ha marcado como favoritos.
 */
const FavoritesScreen = () => {
  const { favoriteRestaurants, isLoadingFavoriteRestaurants, isErrorFavoriteRestaurants } = useFavoriteRestaurants();
  const { removeFavorite } = useUserFavorites();

  const handleRemoveFavorite = async (restaurantId: string) => {
    try {
      await removeFavorite(restaurantId);
    } catch (error) {
      console.error('Error al quitar de favoritos:', error);
    }
  };

  const confirmRemoveFavorite = (restaurantId: string) => {
    Alert.alert(
      'Eliminar favorito',
      '¿Estás seguro que quieres quitar este restaurante de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, eliminar', style: 'destructive', onPress: () => handleRemoveFavorite(restaurantId) },
      ]
    );
  };

  if (isLoadingFavoriteRestaurants) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isErrorFavoriteRestaurants) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Hubo un error al cargar tus favoritos.</Text>
      </View>
    );
  }

  if (!favoriteRestaurants.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No tienes restaurantes favoritos aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRestaurants}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <RestaurantCard restaurant={item} />

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => confirmRemoveFavorite(item._id.toString())}
            >
              <MaterialCommunityIcons name="heart-broken" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 4, // para mobile
    shadowColor: '#000', // para web
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
