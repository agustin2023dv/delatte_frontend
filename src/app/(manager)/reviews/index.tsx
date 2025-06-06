// src/app/(manager)/reviews/index.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useAuthContext } from 'src/core/context/AuthContext';
import ReviewCard from '@features/review/components/ReviewCard';
import { useMyRestaurantsReviews } from '@features/review/hooks/useMyRestaurantsReviews';
import ReviewResponseModal from '@features/review/components/ReviewResponseModal';
import { IReviewResponseDTO } from '@delatte/shared/dtos';
import { useAddReviewReply } from '@features/review/hooks/useAddReviewReply';

const ManagerReviewsScreen = () => {
  const { user } = useAuthContext();
  const { reviews, loading, error, refetch } = useMyRestaurantsReviews(user?._id ?? '');

  const [selectedReview, setSelectedReview] = useState<IReviewResponseDTO | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (review: IReviewResponseDTO) => {
    setSelectedReview(review);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
    setModalVisible(false);
  };

  const { mutate: replyToReview } = useAddReviewReply(
    selectedReview?._id ?? '',
    () => {
      handleCloseModal();
      refetch(); // 🔁 actualiza la lista
    }
  );

  const handleSubmitReply = (mensaje: string) => {
    if (!selectedReview || !mensaje.trim()) return;
    replyToReview(mensaje.trim());
  };

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
    <View style={styles.container}>
      <Text style={styles.header}>Reseñas de mis restaurantes</Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
     renderItem={({ item }) => (
  <ReviewCard
    review={item}
    actionsComponent={
      <Text
        onPress={() => handleOpenModal(item)}
        style={styles.replyButton}
      >
        ✏️ Responder
      </Text>
    }
  />
)}

        ListEmptyComponent={
          <Text style={styles.empty}>Aún no hay reseñas en tus restaurantes.</Text>
        }
      />

      {selectedReview && (
        <ReviewResponseModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReply}
          review={selectedReview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  replyButton: {
  marginTop: 8,
  color: '#4CAF50',
  fontWeight: '600',
},

});

export default ManagerReviewsScreen;
