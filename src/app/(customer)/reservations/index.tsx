import ReservationCard from '@features/reservation/components/ReservationCard';
import { useMyReservations } from '@features/reservation/hooks/useMyReservations';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const CustomerReservationsScreen = () => {
  const { reservations, loading, error, refetch } = useMyReservations();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (Array.isArray(reservations) && reservations.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>No tenés reservas todavía.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reservations}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <ReservationCard reservation={item} />}
      contentContainerStyle={styles.list}
      refreshing={loading}
      onRefresh={refetch}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    fontSize: 16,
    padding: 20,
  },
});

export default CustomerReservationsScreen;
