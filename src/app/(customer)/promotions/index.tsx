import PromotionCard from 'src/features/promotion/components/PromotionCard';
import { useActivePromotions } from 'src/features/promotion/hooks/useActivePromotions';
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const CustomerPromotionsScreen = () => {
  const { promotions, loading, error, refetch } = useActivePromotions(1, 20); 

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

  return (
    <FlatList
      data={promotions}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <PromotionCard promotion={item} />}
      contentContainerStyle={styles.list}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    padding: 20,
  },
  list: {
    paddingVertical: 12,
  },
});

export default CustomerPromotionsScreen;
