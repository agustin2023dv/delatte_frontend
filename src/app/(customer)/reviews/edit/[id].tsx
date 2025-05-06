// src/app/(customer)/reviews/edit/[id].tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMyReviews } from 'src/features/review/hooks/useMyReviews';
import { useUpdateReview } from 'src/features/review/hooks/useUpdateReview';
import { IReviewResponseDTO } from '@delatte/shared/dtos';

const ReviewEditScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { reviews, loading: loadingReviews } = useMyReviews();
  const { editReview, loading: saving } = useUpdateReview();

  const [review, setReview] = useState<IReviewResponseDTO | null>(null);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState('');

  // Buscar la review del usuario con ese ID
  useEffect(() => {
    const found = reviews.find((r) => r._id === id);
    if (found) {
      setReview(found);
      setComentario(found.comentario);
      setCalificacion(found.calificacion.toString());
    }
  }, [id, reviews]);

  const handleSave = async () => {
    if (!id) return;

    const parsedRating = parseInt(calificacion);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      Alert.alert('Error', 'La calificación debe estar entre 1 y 5.');
      return;
    }

    const updated = await editReview(id, {
      comentario,
      calificacion: parsedRating,
    });

    if (updated) {
      Alert.alert('✅ Éxito', 'Reseña actualizada correctamente');
      router.back();
    }
  };

  if (loadingReviews || !review) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando reseña...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Escribí tu reseña actualizada..."
      />

      <Text style={styles.label}>Calificación (1 a 5)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={calificacion}
        onChangeText={setCalificacion}
        placeholder="Ej: 5"
      />

      <Button
        title={saving ? 'Guardando...' : 'Guardar cambios'}
        onPress={handleSave}
        disabled={saving}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewEditScreen;
