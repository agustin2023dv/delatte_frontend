// src/app/(manager)/reservations/index.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuthContext } from 'src/core/context/AuthContext';
import { useRouter } from 'expo-router';
import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';
import { useGetReservationsByRestaurant } from '@features/reservation/hooks/useGetReservationsByRestaurant';
import ReservationCard from '@features/reservation/components/ReservationCard';

/**
 * 🧾 Pantalla donde el manager ve las reservas de cada restaurante que administra.
 */
const ManagerReservationsScreen = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const managerId = user?._id ?? '';

  const {
    restaurants,
    loading: loadingRestaurants,
    error: errorRestaurants,
  } = useGetRestaurantsByManager(managerId);

  if (loadingRestaurants) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorRestaurants || !restaurants.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          {errorRestaurants || 'No se encontraron restaurantes asociados a tu cuenta.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Reservas por restaurante</Text>
        <TouchableOpacity onPress={() => router.push('/(manager)/reservations/create')}>
            <Text style={styles.createButton}> Crear reserva</Text>
        </TouchableOpacity>

      </View>

      {restaurants.map((restaurant) => {
        const { _id, identity } = restaurant;
        const restaurantId = _id.toString();

        const { data: reservations, isLoading, error } = useGetReservationsByRestaurant(restaurantId);

        return (
          <View key={restaurantId} style={styles.section}>
            <Text style={styles.restaurantName}>{identity.nombre}</Text>

            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : error ? (
              <Text style={styles.error}>Error al cargar reservas</Text>
            ) : reservations?.length ? (
              reservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id.toString()}
                  reservation={reservation}
                />
              ))
            ) : (
              <Text style={styles.empty}>No hay reservas para este restaurante.</Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ManagerReservationsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  createButton: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  empty: {
    color: '#777',
    fontStyle: 'italic',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});
