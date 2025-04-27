// src/app/(customer)/restaurants/[id].tsx

import React from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useGetRestaurantById } from '@features/restaurant/hooks/useGetRestaurantById';
import RestaurantInfoBlock from '@shared/components/restaurant/RestaurantInfoBlock';

/**
 * 🏠 Screen `RestaurantDetailsScreen`
 * 
 * Muestra la información detallada de un restaurante para el usuario 'customer'.
 * 
 * Flujo:
 * - Obtiene el ID del restaurante desde la URL.
 * - Usa `useGetRestaurantById` para cargar los datos.
 * - Muestra un spinner mientras carga.
 * - Una vez cargado, muestra el `RestaurantInfoBlock`.
 */
const RestaurantDetailsScreen = () => {
  // Obtener el ID del restaurante desde los parámetros de la URL
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: restaurant, isLoading } = useGetRestaurantById(id);


  // Mostrar spinner mientras carga o si aún no hay datos
  if (isLoading || !restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Mostrar la información del restaurante una vez cargada
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <RestaurantInfoBlock restaurant={restaurant} viewerRole="customer" />
    </ScrollView>
  );
};

export default RestaurantDetailsScreen;
