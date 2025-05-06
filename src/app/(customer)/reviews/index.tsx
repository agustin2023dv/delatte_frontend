// src/app/(customer)/reviews/index.tsx
/**
 * 🧾 Pantalla `MyReviewsScreen`
 *
 * Muestra todas las reseñas realizadas por el usuario logueado.
 * Permite editar y eliminar cada reseña si el usuario es su autor.
 * - Usa `useMyReviews()` para obtener y refrescar las reseñas.
 * - Usa `ReviewsActions` para mostrar botones de acción por cada review.
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useMyReviews } from 'src/features/review/hooks/useMyReviews';
import { useDeleteReview } from 'src/features/review/hooks/useDeleteReview';
import ReviewCard from 'src/features/review/components/ReviewCard';
import ReviewsActions from 'src/features/review/components/ReviewsActions';

const MyReviewsScreen = () => {
  const { reviews, loading, error, refetch } = useMyReviews();
  const { removeReview, loading: deleting } = useDeleteReview();

  const handleDelete = async (id: string) => {
    Alert.alert(
      '¿Eliminar reseña?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const success = await removeReview(id);
            if (success) refetch();
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>⏳ Cargando reseñas...</Text>
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

  if (reviews.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>No escribiste reseñas aún.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ReviewCard
          review={item}
          actionsComponent={
            <ReviewsActions
              review={item}
              onDelete={() => handleDelete(item._id)}
            />
          }
        />
      )}
      contentContainerStyle={styles.list}
      refreshing={loading || deleting}
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

export default MyReviewsScreen;
