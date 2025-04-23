import ReviewCard from '@features/review/components/ReviewCard';
import { useMyReviews } from '@features/review/hooks/useMyReviews';
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const MyReviewsScreen = () => {
  const { reviews, loading, error, refetch } = useMyReviews();

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
      renderItem={({ item }) => <ReviewCard review={item} />}
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

export default MyReviewsScreen;
