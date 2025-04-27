import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from 'src/core/context/AuthContext';
import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';

const ManagerRestaurantsScreen = () => {
  const router = useRouter();
  const { user } = useAuthContext(); 

  const { restaurants, loading, error } = useGetRestaurantsByManager(user?._id || '');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center', color: 'red' }}>
          Error al cargar tus restaurantes. Intenta nuevamente.
        </Text>
      </View>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center' }}>
          No tienes restaurantes asignados actualmente.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant._id.toString()}
          onPress={() => router.push({
            pathname: '/restaurants/[id]',
            params: { id: restaurant._id.toString() },
          })}
          style={{
            padding: 16,
            marginBottom: 12,
            backgroundColor: '#f9f9f9',
            borderRadius: 8,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{restaurant.identity.nombre}</Text>
          {restaurant.identity.descripcion && (
            <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
              {restaurant.identity.descripcion}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ManagerRestaurantsScreen;
