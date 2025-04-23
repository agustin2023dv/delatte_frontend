import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useGetRestaurantById } from 'src/features/restaurant/hooks/useGetRestaurantById';
import RestaurantInfoBlock from '@shared/components/restaurant/RestaurantInfoBlock';

const RestaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { restaurant, loading, error } = useGetRestaurantById(id || '');

  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!restaurant) return <Text style={styles.error}>Restaurante no encontrado.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RestaurantInfoBlock restaurant={restaurant} viewerRole="customer" />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    marginTop: 48,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});

export default RestaurantDetailsScreen;
