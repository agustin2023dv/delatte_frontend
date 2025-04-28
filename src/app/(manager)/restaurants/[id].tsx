// src/app/(manager)/restaurants/[id].tsx

import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetRestaurantById } from '@features/restaurant/hooks/useGetRestaurantById';
import { useCheckIsManager } from '@features/restaurant/hooks/useCheckIsManager';
import RestaurantInfoBlock from '@shared/components/restaurant/RestaurantInfoBlock';
import RestaurantPhotoManager from '@features/restaurant/components/image-management/RestaurantPhotoManager'; // 👈 Importarlo acá

const ManagerRestaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: restaurant, isLoading: isLoadingRestaurant } = useGetRestaurantById(id);
  const { data: isManager, isLoading: isLoadingManagerCheck } = useCheckIsManager(id);

  if (isLoadingRestaurant || isLoadingManagerCheck) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center' }}>
          Restaurante no encontrado o no tienes acceso.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Información pública del restaurante */}
      <RestaurantInfoBlock restaurant={restaurant} viewerRole="manager" />

      {/* Gestión (solo si realmente es manager o co-manager) */}
      {isManager && (
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
            Gestión de imágenes
          </Text>

          <RestaurantPhotoManager restaurantId={restaurant._id.toString()} />
        </View>
      )}
    </ScrollView>
  );
};

export default ManagerRestaurantDetailsScreen;
